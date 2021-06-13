const Model = require('./model');

const getChats = async (idUser) => {
    return new Promise((resolve, reject) => {
        let filter = {};
        if(idUser != null){

            filter = {users: idUser};
        }
        Model.find(filter)
        .populate('users')
        .exec((error, populate) => {
            if(error){

                return reject(error);
            }
            return resolve(populate);
        });
    });
};

const createChat = async (chat) => {
    const newChat = new Model(chat);
  
    return newChat.save();
};

//Receiving the ID of the chat and the user who is gonna be deleted
const updateChat = async (idChat, username) => {
    const oldChat = await Model.find({_id : idChat});

    
}

module.exports = {
    get: getChats,
    create: createChat,
}