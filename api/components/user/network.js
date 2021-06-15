const express = require('express');

const response = require('../../network/response');
const controller = require('./controller');
const secure = require('./secure');

const router = express.Router();

router.post('/', (req, res, next) => {

    controller.createUser(req.body)
    .then( data => {
        response.success( req, res, data, 201 );
    })
    .catch(next);

});

router.get('/', (req, res, next) => {

    controller.listUser()
    .then(data => {
        response.success(req, res, data, 200);
    })
    .catch(next);

});

router.get('/contacts/:id', secure('get'), (req, res, next) => {

    controller.listContacts(req.params.id)
    .then(data => {
        response.success(req, res, data, 200);
    })
    .catch(next);
});

module.exports = router;