const store = require('./store');

const createUser = (username, email) => {

    return new Promise((resolve, reject) => {
        if( !username || !email ){

            return reject('Incomplete fields');
        };
        const user = {
            username: username,
            email: email,
        }
        resolve(store.create(user));
    });
};

const listUser = (filterUser) => {

    return Promise.resolve(store.list(filterUser));
};

module.exports = {
    createUser,
    listUser,
}