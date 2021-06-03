const mongoose = require('mongoose');
const {Schema} = mongoose;

const chatSchema = new Schema({
    users: [{
         type: Schema.ObjectId,
         ref: 'user',
         require: true,
    }]
});

module.exports = mongoose.model('chat', chatSchema);