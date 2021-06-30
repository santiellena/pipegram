const auth = require('../components/auth');
const user = require('../components/user');
const chat = require('../components/chat');
const message = require('../components/message');

const { notFound } = require('../../utils/errors');

const routes = (app) => {

    app.use('/auth', auth);
    app.use('/message', message);
    app.use('/user', user);
    app.use('/chat', chat);
    app.use(notFound); //Catch 404
};

//Exports routes to receive them on the server
module.exports = routes;