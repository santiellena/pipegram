const mongoose =  require('mongoose');

const {Schema} = mongoose;

const messageSchema = new Schema({
    
    user: { 
        type: Schema.ObjectId, 
        ref:'user',
        required: true,
    },
    message: { 
        type: String, 
        required: true,
    },
    chat: {
        type: Schema.ObjectId,
        ref: 'chat',
        required: true,
    },
    date: Date,
    file: String,

});

module.exports = mongoose.model('messages', messageSchema);

