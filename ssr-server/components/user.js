const express = require('express');
const router = express.Router();

const boom = require('@hapi/boom');
const config = require('../config');
const axios = require('axios');
const passport = require('passport');
const response = require('../network/response');


router.get('/:id', async (req, res, next) => {

    try {
        const { token } = req.cookies;
       
        if(!token || token == undefined){
            throw boom.badRequest('There is no token');  
        }
        const { id } = req.params;
        const { data, status } = await axios({

            url: `${config.apiUrl}api/user/${id}`,
            headers: { Authorization: `Bearer ${token}` },
            method: 'get',
        });

        response.success(req, res, data, status);
    } catch (err) {
        next(err);
    }
});

module.exports = router;