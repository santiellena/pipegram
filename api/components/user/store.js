const Model = require('./model');

const createUser = async (user) => {
    const myUser = new Model(user);

    return myUser.save();
};

const deleteUser = async (id) => {

    
};

const updateUser = async (id) => {


};

const listUser = () => {

    return new Promise((resolve, reject) => {
        Model.find()
        .populate('contacts')
                .exec((error, populate) => {
                    if( error ){
    
                        return reject(error);
                    }
                    resolve(populate);
        });
    });
};

const listContacts = (id) => {

    return new Promise((resolve, reject) => {
        Model.find({_id: id})
        .populate('contacts')
            .exec((err, populate) => {
                if(err){
                    return reject(err);
                };

                resolve(populate);
            });

    });
};

module.exports = {
    create: createUser,
    delete: deleteUser,
    update: updateUser,
    list: listUser,
    listContacts,
};