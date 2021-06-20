const model = require('./apiKeysModel');
const boom = require('@hapi/boom');

const getToken = async (token) => {
    try{
        const apiToken = await model.find({token: token});

        return apiToken[0];
    } catch(err){

        throw boom.internal('Internal Server Error');
    };
};

module.exports = getToken;