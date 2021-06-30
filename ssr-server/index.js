const express = require('express');

const config = require('./config');
const cookieParser = require('cookie-parser');
const routes = require('./network/routes');

const cors = require('cors');
const error = require('./utils/errors');

//Initializations
const app = express();

//Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//ROUTES
routes(app);

//Errors middleware
app.use(error.wrapErrors);
app.use(error.errors);

//Server listening
app.listen(config.port, () => {

    console.log(`SSR listening... ${config.host}:${config.port}`);
});