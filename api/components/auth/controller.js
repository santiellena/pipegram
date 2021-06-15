const auth = require('../../../auth/index');
const bcrypt = require('bcrypt');
const boom = require('@hapi/boom');
const store = require('./store');

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
        if(data == undefined){

            throw boom.badRequest('Incomplete Fields');
        };
        
       return bcrypt.compare(password, data.password)
        .then(equal => {
            if(equal == true){
                
                delete data.password;
                return auth.sign(data.toJSON());  //Returns TOKEN
            } else{

                return boom.unauthorized('Incorrect Information', 401);
            }
        })
        .catch();

};

module.exports = {
    insert,
    login,
};