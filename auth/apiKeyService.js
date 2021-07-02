const model = require('./apiKeysModel');
const boom = require('@hapi/boom');

const getToken = async (token) => {
    try{
        
        return  await model.findOne({token: token});
    } catch(err){

        throw boom.internal('Internal Server Error');
    };
};

module.exports = getToken;