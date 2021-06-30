const rateLimiter = require('express-rate-limit');

const login = rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: 'Too many requests form this IP, please try again later',
});

const register = rateLimiter({
    windowMs: 60 * 60 * 1000,
    max: 4,
    message: 'Too many requests from this IP, please try again later',
});

module.exports = {
    login,
    register,
};