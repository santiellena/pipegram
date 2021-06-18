const auth = require('../../../auth/index');
const bcrypt = require('bcrypt');
const boom = require('@hapi/boom');
const store = require('./store');
const userStore = require('../user/store');

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

const login = async (username, password) => {
    
    const data = await store.query(username);
    const userSemiPublicData = await userStore.query(username);

        if(data == undefined){

            throw boom.badRequest('Incomplete Fields');
        };
    //const toCompare = data.password;
       return bcrypt.compare(password, data.password)
        .then(equal => {
            if(equal == true){
               const tokenData = {
                    username: data.username,
                    id: userSemiPublicData.id,
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