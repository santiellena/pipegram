const express = require('express');
const router = express.Router();

const controller = require('./controller');
const response = require('../../../network/response');
const secure = require('../../../utils/middlewares/secure'); //Verifica que el token pertenece al cliente y es valido
const allowed = require('../../../utils/middlewares/allowScope');
const limiter = require('../../../utils/rateLimiter');

router.post('/login', limiter.login, (req, res, next) => {

    controller.login(req.body.username, req.body.password, req.body.apiKeyToken)
    .then(TOKEN => {
        response.success(req, res, TOKEN, 200);
    })
    .catch(next);
});

router.post('/auth-provider', limiter.login, (req, res, next) => {

    controller.providerUserLogin(req.body)
    .then(data => {
        response.success(req, res, data, 200);
    })
    .catch(next);
});


module.exports = router;