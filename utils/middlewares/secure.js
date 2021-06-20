const auth = require('../../auth/index');

const chechAuth = (action) => {

    const middleware = (req, res, next) => {
        let owner;
        switch(action){
            case 'update': 
                owner = req.body.id;
                auth.check.own(req, owner);
                next();
                break;
            case 'get': 
                owner = req.params.id;
                auth.check.own(req, owner);
                next();
                break;
            default: next();
        }
    };
    return middleware
}

module.exports = chechAuth;