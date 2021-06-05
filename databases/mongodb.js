const db = require('mongoose');

const configs = require('../configs');
const uri = configs.DBuri;
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