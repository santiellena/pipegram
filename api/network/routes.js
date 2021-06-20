const message = require('../components/message/network');
const user = require('../components/user/network');
const chat = require('../components/chat/network');
const auth = require('../components/auth/network');

const { notFound } = require('../../utils/errors');

const routes = (server) => {

    server.use('/api/message', message);
    server.use('/api/user', user);
    server.use('/api/chat', chat);
    server.use('/api/auth', auth);
    server.use(notFound); //Catch 404
}

//Exports routes to receive them on the server
module.exports = routes;