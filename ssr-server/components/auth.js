const express = require('express');
const router = express.Router();

const boom = require('@hapi/boom');
const config = require('../config');
const axios = require('axios');
const response = require('../network/response');

const THIRTY_DAYS_IN_SEC = 2592000;
const TWO_HOURS_IN_SEC = 7200;

router.post('/login', async (req, res, next) => {
    try{
        const { status, data, statusText } = await axios({
            url: `${config.apiUrl}api/auth/login`,
            method: 'post',
            data: {
                username: req.body.username,
                password: req.body.password,
                apiKeyToken: config.apiKeyToken,
            },
        });

        if(!data){

            next(boom.unauthorized());
        }

        req.login(data, { session: false }, async (err) => {
            if(err){
                next(err);
            };
        
            res.cookie("token", data, {

                httpOnly: config.mode !== 'dev' ? false : config.mode,
                secure: config.mode !== 'dev' ? false : config.mode,
                //maxAge: remembeMe ? THIRTY_DAYS_IN_SEC : TWO_HOURS_IN_SEC,
            });


            response.success(req, res, statusText, status);
        });

    } catch(err){

        response.error(req, res, err, 400);
    }

});


router.post('/register', async (req, res, next) => {
    const userData = {
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        email: req.body.email
    };

    try{
        await axios({
            url: `${config.apiUrl}api/user/register`,
            method: 'post',
            data: userData,
        });

        res.status(201).json({ message: 'user created' });
        
    }catch(err){
        next(err);
    }
});

module.exports = router;