const mongoose = require('mongoose');
const { Schema } = mongoose;
const config = require('../../../config');

const providerUserSchema = new Schema({
    name: {
        type: String, 
        required: true, 
    },
    username: {
        type: String, 
        default: 'invited-user',
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    profilePhoto: {
        type: String,
        default: `${config.api.host}:${config.api.port}/${config.api.public.files}${config.api.public.defaultPhoto}`,
    },
    contacts: [{
        type: Schema.ObjectId,
        ref: 'user',
    }],
    apiKeyToken: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('providerUser', providerUserSchema);
