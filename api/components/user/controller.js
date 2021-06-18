const store = require('./store');
const auth = require('../auth/controller');
const boom = require('@hapi/boom');

const createUser = (body) => {

    return new Promise( async (resolve, reject) => {
        if( !body.username || !body.email || !body.password || !body.name){

            return reject(boom.badRequest('Incomplete fields'));
        };

        const user = {
            name: body.name,
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

const deleteUser = async (id) => {

    if(!id){

        boom.badRequest('Must be an id');
    }

    return await store.delete(id);
};

const updateUser = async (data) => {
    const newInfo = {
        name: data.name? data.name : null,
        username: data.username? data.username : null,
    };

    return await store.update(newInfo);
};

const getUser = async (id) => {
    if(!id){

        throw boom.badRequest('Incomplete information');
    }
    return await store.list(id);
};

const listContacts = (id) => {
    
    return Promise.resolve(store.listContacts(id));
};

module.exports = {
    createUser,
    getUser,
    listContacts,
    deleteUser,
    updateUser,
}