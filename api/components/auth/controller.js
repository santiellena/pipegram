const auth = require('../../../auth/index');
const bcrypt = require('bcrypt');
const boom = require('@hapi/boom');
const store = require('./store');
const userStore = require('../user/store');

const apiKeyService = require('../../../auth/apiKeyService');

const insert = (data) => {

    return new Promise( async (resolve, reject) => {
        let authData = {};
        const SALT_ROUNDS = 10;
        if(!data.username || !data.password || !data.email){

            return reject(boom.badRequest('No data'));
        }
    
            authData.username = data.username;
            authData.email = data.email;
            authData.password = await bcrypt.hash(data.password, SALT_ROUNDS);
        
        
        resolve(store.insert(authData));
    });
    
};

const login = async (username, password, apiKeyToken) => {

    if(!apiKeyToken){

        throw boom.badRequest('ApiKeyToken is required');
    };
    const data = await store.query({username: username});
    const userSemiPublicData = await userStore.query({username: username});
        if(data == undefined){

            throw boom.badRequest('Incomplete Fields');
        };

        const apiKey = await apiKeyService(apiKeyToken);
        if(apiKey == undefined){

            throw boom.badRequest('Incorrect ApiKeyToken');
        };
        
       return bcrypt.compare(password, data.password)
        .then(equal => {
            if(equal == true){
               const tokenData = {
                    id: userSemiPublicData.id,
                    scopes: apiKey.scopes,
                };
                
                return auth.sign(tokenData);  //Returns TOKEN
            } else{

                return boom.unauthorized('Incorrect Information', 401);
            };
        })
        .catch();

};

const createOrGetUser = async (body) => {
    const queriedUser = await store.queryProviderUser({email: body.user.email});

    if(queriedUser){

        return queriedUser;
    }

    if(!body.user.email || !body.user.password || !body.user.name){

        return boom.badRequest();
    };

    const userData = {
        name: body.user.name,
        email: body.user.email,
        password: body.user.password,
        apiKeyToken: body.apiKeyToken,
    }

    if(body.user.password || body.user.username){
        await store.insertProviderUserAuth({
            username: body.user.username,
            name: body.user.name,
            email: body.user.email,
            password: body.user.password,
        });
    };

    return await store.createProviderUser(userData);
};

const providerUserLogin = async (body) => { //For providers users

    return new Promise( async (resolve, reject) => {
        if(!body.apiKeyToken){

            return reject(boom.unauthorized('ApiKeyToken is required...'));
        }
    
        if(!body.user.email || !body.user.password || !body.user.name ){

            return reject(boom.badRequest('Incomplete fields'));
        };

        const apiKey = await apiKeyService(body.apiKeyToken);

        if(!apiKey){

            return reject(boom.unauthorized('Invalid Token'));
        }

        const queriedUser = await createOrGetUser(body);
        
        const payload = {
            sub: queriedUser._id,
            username: queriedUser.username,
            email: queriedUser.email,
            scopes: apiKey.scopes,
        }

        const token = await auth.sign(payload);

        const data = () => {
            return {
                user: queriedUser,
                token,
            }
        }

        resolve(data());
    });
};

module.exports = {
    insert,
    login,
    providerUserLogin,
};