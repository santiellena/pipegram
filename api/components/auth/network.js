const express = require('express');
const router = express.Router();

const controller = require('./controller');
const response = require('../../network/response');

router.post('/login', (req, res, next) => {

    controller.login(req.body.username, req.body.password)
    .then(TOKEN => {
        response.success(req, res, TOKEN, 200);
    })
    .catch(err => {
        response.error(req, res, 'Internal error', 500, err)
    });
});


module.exports = router;