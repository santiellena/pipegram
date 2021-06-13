const message = require('../components/message/network');
const user = require('../components/user/network');
const chat = require('../components/chat/network');
const auth = require('../components/auth/network');

const routes = (server) => {

    server.use('/message', message);
    server.use('/user', user);
    server.use('/chat', chat);
    server.use('/auth', auth);
}

//Exports routes to receive them on the server
module.exports = routes;