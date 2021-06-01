const express = require('express');

const response = require('../../network/response');
const controller = require('./controller');

const router = express.Router();

router.post('/', (req, res) => {

    controller.createUser(req.body.username, req.body.email)
    .then( data => {

        response.success( req, res, data, 201 );
    })
    .catch(e => {

        response.error( req, res, 'Request error', 400, e )
    });
});

router.get('/', (req, res) => {
    const filterUser = req.query.username || null;

    controller.listUser(filterUser)
    .then(data => {

        response.success(req, res, data, 200);
    })
    .catch(e => {

        response.error(req, res, "Internal error", 500, e);
    });

});

module.exports = router;