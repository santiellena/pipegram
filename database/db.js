const db = require('mongoose');

const dbConfig = require('./db-config');
const uri = dbConfig.uri;
const config = dbConfig.config;

db.Promise = global.Promise;

const connect = () => {
    
    db.connect(uri, config)
    .then(() => console.log('[db] Successfully conected'))
    .catch(e => console.error('[db]', e));
}

module.exports = connect;