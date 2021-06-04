const express = require('express');

const router = require('./network/routes');

const db = require('./database/db');

const socket = require('./socket');

const cors = require('cors')

//Initializations
const app = express();
const server = require('http').Server(app);

//Settings
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(express.json());
app.use(express.static('public/'));
app.use(cors());
db(); 

//Routes
socket.connect(server);
router(app); 

//Start the server
server.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`)
});