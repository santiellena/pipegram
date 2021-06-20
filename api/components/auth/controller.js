const auth = require('../../../auth/index');
const bcrypt = require('bcrypt');
const boom = require('@hapi/boom');
const store = require('./store');
const userStore = require('../user/store');
const apiKeyService = require('../../../auth/apiKeyService');

const insert = (data) => {

    return new Promise( async (resolve, reject) => {
        let authData = {};

        if(!data.username || !data.password || !data.email){

            return reject(boom.badRequest('No data'));
        }
    
            authData.username = data.username;
            authData.email = data.email;
            authData.password = await bcrypt.hash(data.password, 7);
        
        
        resolve(store.insert(authData));
    });
    
};

const login = async (username, password, apiKeyToken) => {

    if(!apiKeyToken){

        throw boom.badRequest('ApiKeyToken is required');
    };
    const data = await store.query(username);
    const userSemiPublicData = await userStore.query(username);
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
                    username: data.username,
                    id: userSemiPublicData.id,
                    scope: apiKey.scopes,
                };
                
                return auth.sign(tokenData);  //Returns TOKEN
            } else{

                return boom.unauthorized('Incorrect Information', 401);
            };
        })
        .catch();

};

module.exports = {
    insert,
    login,
};