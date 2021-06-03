const express = require('express');

const router = require('./network/routes');

const db = require('./database/db');

//Initializations
const app = express();

//Settings
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(express.json());
app.use(express.static('public/'));
db(); 

//Routes
router(app); 

//Start the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`)
});