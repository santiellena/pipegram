const auth = require('../../../auth/index');
const bcrypt = require('bcrypt');
const error = require('../../../utils/error');

const store = require('./store');

const insert = (data) => {

    return new Promise( async (resolve, reject) => {
        let authData = {};

        if(!data.username || !data.password || !data.email){

            return reject(error('[controllerAuth] No data', 400));
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

            throw error('Incomplete Fields', 400);
        };
        
       return bcrypt.compare(password, data.password)
        .then(equal => {
            if(equal == true){
    
                return auth.sign(data.toJSON());  //Returns TOKEN
            } else{

                return error('Incorrect Information', 401);
            }
        })
        .catch();

};

module.exports = {
    insert,
    login,
};