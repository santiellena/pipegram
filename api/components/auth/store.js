const Model = require('./model');
const UserProviderModel = require('./providerUserModel');
const UserProviderAuthModel = require('./providerUserAuthModel');

const insert = async (data) => {

    const newAuth = await new Model(data);
    newAuth.save()

    return true;
};

const insertProviderUserAuth = async (data) => {

    const newAuth = await new UserProviderAuthModel(data);
    newAuth.save();

    return true;
};

const createProviderUser = async (user) => {
    const newProviderUser = await new UserProviderModel(user);
    newProviderUser.save();

    return newProviderUser;
};

const query = async (filter) => {
     
    return await Model.findOne(filter);
};

const queryProviderUser = async (filter) => {
    
    return await UserProviderModel.findOne(filter);
};

module.exports = {
    insert,
    query,
    createProviderUser,
    queryProviderUser,
    insertProviderUserAuth,
}