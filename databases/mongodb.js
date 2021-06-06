const db = require('mongoose');

const configs = require('../config');
const uri = configs.MONGOuri;
const config = {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
};

db.Promise = global.Promise;

const connect = () => {
    
    db.connect(uri, config)
    .then(() => console.log('[mongodb] Successfully conected'))
    .catch(e => console.error('[mongodb]', e));
}

module.exports = connect;