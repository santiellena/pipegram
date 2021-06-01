const express = require('express');

const router = require('./network/routes');

const db = require('./database/db');

db();

const app = express();

app.use(express.json());
app.use(express.static('public/'));

router(app); 


app.listen(3000);
console.log('SERVER ON PORT 3000');