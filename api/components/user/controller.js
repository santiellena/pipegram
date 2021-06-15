const store = require('./store');
const auth = require('../auth/controller');
const boom = require('@hapi/boom');

const createUser = (body) => {

    return new Promise( async (resolve, reject) => {
        if( !body.username || !body.email || !body.password){

            return reject(boom.badRequest('Incomplete fields'));
        };

        const user = {
            username: body.username,
            email: body.email,
        }

        if(body.password || body.username){
            await auth.insert({
                username: user.username,
                email: user.email,
                password: body.password,
            });
        }

        resolve(store.create(user));
    });
};

const listUser = async () => {
    
    return await store.list();
};

const listContacts = (id) => {
    
    return Promise.resolve(store.listContacts(id));
};

module.exports = {
    createUser,
    listUser,
    listContacts,
}