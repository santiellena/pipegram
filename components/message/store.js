const Model = require('./model');

const addMessage = (message) => {

    const myMessage = new Model(message);
    myMessage.save();
};

const getMessages = async (filterChat) => {
    return new Promise((resolve, reject) => {
        let filter = {};
        if(filterChat != null){
        
            filter = { chat: filterChat }
        }
        Model.find(filter)
            .populate('user')
            .exec((error, populate) => {
                if( error ){

                    return reject(error);
                }
                resolve(populate);
            });

    });

};

const updateText = async (id, message) => {
    const foundedMessage = await Model.findOne({_id : id});

    foundedMessage.message = message;

    const newMessage = await foundedMessage.save();
    
    return newMessage;
};

const deleteMessage = async (id) => {

    const deletedMessage = await Model.findByIdAndDelete({
        _id : id
    });

    return deletedMessage;
};

module.exports = {
    add: addMessage,
    list: getMessages,
    update: updateText,
    delete: deleteMessage,
}