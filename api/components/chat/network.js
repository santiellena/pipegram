const express = require('express');
const router = express.Router();

const controller = require('./controller');
const response = require('../../network/response');

router.get('/', (req ,res) => {

    controller.getChats(req.query.idUser)
    .then(data => response.success(req, res, data, 200))
    .catch(e => response.error(req, res, "Request error", 400, e));
});

router.post('/', (req, res) => {
    
    controller.createChat(req.body.users)
    .then(data => response.success(req, res, data, 201))
    .catch(e => response.error(req, res, 'Request error', 400, e));

});

module.exports = router;