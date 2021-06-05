const express = require('express');

const router = require('./network/routes');

const db = require('./databases/mongodb');

const socket = require('./socket');

const cors = require('cors');

const config = require('./configs');

//Initializations
const app = express();
const server = require('http').Server(app);

//Settings


//Middlewares
app.use(express.json());
app.use(express.static(config.publicRoute));
app.use(cors());
db(); 

//Routes
socket.connect(server);
router(app); 

//Start the server
server.listen(config.port, () => {
    console.log(`Server listening ${config.host}:${config.port}`);
});