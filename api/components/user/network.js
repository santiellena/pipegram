const express = require('express');

const response = require('../../../network/response');
const controller = require('./controller');
const secure = require('../../../utils/middlewares/secure'); //Verifica que el token pertenece al cliente y es valido
const allowed = require('../../../utils/middlewares/allowScope'); //Verifica los permisos

const router = express.Router();

router.post('/register', allowed(['register:auth']), (req, res, next) => {

    controller.createUser(req.body)
    .then( data => {
        response.success( req, res, data, 201 );
    })
    .catch(next);

});

router.get('/:id', allowed(['read:user']), secure('get'), (req, res, next) => {

    controller.getUser(req.params.id)
    .then(data => {
        response.success(req, res, data, 200);
    })
    .catch(next);

});

router.get('/contacts/:id', allowed(['read:user']), secure('get'), (req, res, next) => {

    controller.listContacts(req.params.id)
    .then(data => {
        response.success(req, res, data, 200);
    })
    .catch(next);
});

module.exports = router;