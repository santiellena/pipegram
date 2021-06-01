const Model = require('./model');

const createUser = async (user) => {
    const myUser = new Model(user);

    return myUser.save();
};

const deleteUser = async (id) => {


};

const updateUser = async (id) => {


};

const listUser = async (filterUser) => {
    let filter = {};
    if(filterUser != null){

        filter = { username: filterUser };        
    }
    const list = await Model.find(filter);
    return list;
};

module.exports = {
    create: createUser,
    delete: deleteUser,
    update: updateUser,
    list: listUser,
};