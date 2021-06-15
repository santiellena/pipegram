const express = require('express');

const router = require('./network/routes');

const db = require('../store/mongodb');
const socket = require('./socket');

const cors = require('cors');

const config = require('../config');


//Initializations
const app = express();
const server = require('http').Server(app);
const error = require('./network/errors');

//Settings


//Middlewares
app.use(express.json());
app.use(express.static(config.api.publicRoute));
app.use(cors());
db(); 

//Routes
socket.connect(server);
router(app); 

//Errors
app.use(error);

//Start the server
server.listen(config.api.port, () => {
    console.log(`Server listening ${config.api.host}:${config.api.port}`);
});