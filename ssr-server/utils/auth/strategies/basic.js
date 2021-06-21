const passport = require('passport');
const { BasicStrategy } = require('passport-http');
const boom = require('@hapi/boom');
const axios = require('axios');
const config = require('../../../config');

passport.use(
    new BasicStrategy(async (username, password, done) => {
        try{
            const { data } = axios({
                url: `${config.apiUrl}api/auth/login`,
                method: 'post',
                data: {
                    password,
                    username,
                    apiKeyToken: config.apiKeyToken,
                    }
                });

            if(!data.body || data.statusCode !== 200){
                return done(boom.unauthorized(), false);
            }
            return done(null, data);
            
        }catch(err){
            
            done(err, null);
        }
    })
);

passport.authenticate('basic', (err, data) => {
    try{
        if(err || !data){
            next(boom.unauthorized());
        }

        req.login(data, { session: false }, async (err) => {
            if(err){
                next(err);
            };
        
            const { token, ...user } = data;

            res.cookie("token", token, {

                httpOnly: config.mode !== 'dev' ? false : config.mode,
                secure: config.mode !== 'dev' ? false : config.mode,
                //maxAge: remembeMe ? THIRTY_DAYS_IN_SEC : TWO_HOURS_IN_SEC,
            });

        res.status(200).send(user);
        });

    }catch(err){
        next(err);
    };
})(req, res, next);
