const Model = require('./model');

const insert = async (data) => {

    const newAuth = await new Model(data);
    newAuth.save()

    return true;
};

const query = async (username) => {
    const data = await Model.find({username: username});
    
    return data[0];
}

module.exports = {
    insert,
    query,
}