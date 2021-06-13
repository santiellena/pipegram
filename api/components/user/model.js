const mongoose = require('mongoose');

const {Schema} = mongoose;

const userSchema = new Schema({
    username: {
        type: String, 
        required: true, 
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    contacts: [{
        type: Schema.ObjectId,
        ref: 'user',
    }]
});

module.exports = mongoose.model('user', userSchema);