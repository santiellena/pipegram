const store = require('./store');
const auth = require('../auth/controller');

const createUser = (body) => {

    return new Promise( async (resolve, reject) => {
        if( !body.username || !body.email || !body.password){

            return reject('Incomplete fields');
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

const listUser = () => {

    return Promise.resolve(store.list());
};

const listContacts = (id) => {

    return Promise.resolve(store.listContacts(id));
};

module.exports = {
    createUser,
    listUser,
    listContacts,
}