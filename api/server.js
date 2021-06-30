const express = require('express');

const router = require('./network/routes');

const db = require('../store/mongodb');
const socket = require('./socket');

const cors = require('cors');
const helmet = require('helmet');

const config = require('../config');
const error = require('../utils/errors');

//Initializations
const app = express();
const server = require('https').Server(app);

//Settings


//Middlewares
app.use(express.json());
app.use(express.static(__dirname + config.api.public.route));
app.use(cors());
app.use(helmet());
db(); 

//Routes
socket.connect(server);
router(app); 

//Errors middleware
app.use(error.wrapErrors);
app.use(error.errors);

//Start the server
server.listen(config.api.port, () => {
    console.log(`Server listening ${config.api.host}:${config.api.port}`);
});