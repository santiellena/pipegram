const express = require('express');

const config = require('./config');
const cookieParser = require('cookie-parser');
const routes = require('./network/routes');

const cors = require('cors');

//Initializations
const app = express();

//Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//ROUTES
routes(app);

//Server listening
app.listen(config.port, () => {

    console.log(`SSR listening... ${config.host}:${config.port}`);
});