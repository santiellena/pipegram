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
    return new Promise((resolve, reject) => {
        let filter = {};
        if(filterUser != null){
    
            filter = { _id : filterUser };        
        }
        Model.find(filter)
        .populate('contacts')
                .exec((error, populate) => {
                    if( error ){
    
                        return reject(error);
                    }
                    resolve(populate);
        });
    });
    
};

module.exports = {
    create: createUser,
    delete: deleteUser,
    update: updateUser,
    list: listUser,
};