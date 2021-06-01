const store = require('./store');

const getChats = (idUser) => {

     return Promise.resolve(store.get(idUser));   
};

const createChat = (users) => {

    return new Promise((resolve, reject) => {
        if(!users || users.lenght <= 1 || !Array.isArray(users)){

           return reject('Incomplete fields || must there 2 or more users in a chat')
        }
        const chat = {
            users: users,
        }

       resolve(store.create(chat));
    });
};

module.exports = {
    getChats,
    createChat,
}