const express = require('express');
const router = express.Router();

const boom = require('@hapi/boom');
const config = require('../config');
const axios = require('axios');
const response = require('../network/response');
const passport = require('passport');

const limiter = require('../utils/rateLimiter');

const THIRTY_DAYS_IN_SEC = 2592000;
const TWO_HOURS_IN_SEC = 7200;

//Google OAuth Strategy
require('../utils/auth/strategies/oauth');

router.post('/login', limiter.login, async (req, res, next) => {
    try {
        if(!req.body.username || !req.body.password){

            next(boom.badRequest('Incomplete fields'));
        }
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
                //httpOnly: config.mode !== 'dev' ? false : config.mode,
                //secure: config.mode !== 'dev' ? false : config.mode,
                //maxAge: THIRTY_DAYS_IN_SEC,
            });
    
            response.success(req, res, statusText, status);
        });

    } 
    catch(err) {

        next(boom.badImplementation(err));
    }

});


router.post('/register', limiter.register, async (req, res, next) => {

    const userData = {
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        email: req.body.email
    };

    if(!userData.username || !userData.password || !userData.name || !userData.email){

        next(boom.badRequest('Incomplete information'));
    }

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

router.get('/google-oauth', limiter.login, passport.authenticate('google-oauth', {
    scope: [
        'email',
        'profile',
        'openid',
    ]
}));

router.get('/google-oauth/callback', limiter.login, passport.authenticate('google-oauth', {session: false}),
(req, res, next) => {
    if(!req.user){

        next(boom.unauthorized());
    }

    const {token, user} = req.user;

    delete user.apiKeyToken;
    
    res.cookie('token', token, {
        httpOnly: !config.mode,
        secure: !config.mode
    });
    
    response.success(req, res, user, 200);
});

module.exports = router;