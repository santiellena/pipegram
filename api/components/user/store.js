const Model = require('./model');

const createUser = async (user) => {
    const myUser = await new Model(user);

    return await myUser.save();
};

const deleteUser = async (id) => {

    return await Model.findByIdAndDelete(id);
};

const updateUser = async (id) => {


};

const listUser = (id) => {
    return new Promise((resolve, reject) => {
        Model.find({_id: id})
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
        .populate({
            path: 'contacts',
            select: 'name',
        })
            .exec((err, populate) => {
                if(err){
                    return reject(err);
                };

                resolve(populate);
            });

    });
};

const query = async (username) => {

    const data = await Model.find({username: username});

    return data[0];
};

module.exports = {
    create: createUser,
    delete: deleteUser,
    update: updateUser,
    list: listUser,
    listContacts,
    query,
};