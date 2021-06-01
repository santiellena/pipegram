const express = require('express');

const router = require('./network/routes');

const db = require('./database/db');

db();

const app = express();

app.use(express.json());
app.use(express.static('public/'));

router(app); 

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`)
});