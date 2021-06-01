const store = require('./store');


const addMessage = (idUser, message, idChat, file) => {

    return new Promise((resolve, reject) => {
        
        if( !idUser || !message || !idChat){
            console.error('[messageController] Incompleted params');
            return reject('Incorrect data');
        }
        let filePath = '';
        if(file){
            filePath = `http://localhost:3000/files/${file.filename}`
        }
        const fullMessage = {
            "user": idUser,
            "message": message,
            "chat" : idChat,
            "date": new Date(),
            "file" : filePath,
        }

        store.add(fullMessage);

        resolve(fullMessage);
    });
   
};

const getMessages = (filterChat) => {
    return new Promise((resolve, reject) => {
        resolve(store.list(filterChat));
    });
};

const updateMessage = (id, message) => {

    return new Promise(async (resolve, reject) => {

        if(!id || !message){

            return reject('[messageController] Incompleted params');
        }
        const result = await store.update(id, message);

        resolve(result);

    });
}

const deleteMessage = (id) => {
    return new Promise( async (resolve, reject) => {
        if( !id ){
            reject('[messageController] Incorrect parameter');
        }
        const result = await store.delete(id);

        resolve(result);
    });
}

module.exports = {
    addMessage,
    getMessages,
    updateMessage,
    deleteMessage,
};