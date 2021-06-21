const express = require('express');
const router = express.Router();

const boom = require('@hapi/boom');
const config = require('../config');
const axios = require('axios');
const passport = require('passport');


router.get('/:id', (req, res, next) => {

    try {
        const { user } = req.body
        const { token } = req.cookies;

        const { data, status } = axios({

            url: `${config.apiUrl}api/user/${user.id}`,
            method: 'get',
            data: user,
        });

        res.status(status).json(data);
    } catch (err) {
        next(err);
    }
});

module.exports = router;