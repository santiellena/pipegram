const configs = {
    //API CONFIGS
    api: {
        //YOU KNOW WHAT IS THIS
        port: process.env.PORT || 'Number',
        host: process.env.HOST || 'String',
        //FOR PUBLIC FOLDER
        public: {
            route: process.env.PUBLIC_ROUTE || 'String',
            files: process.env.FILES_ROUTE || 'String',
            defaultPhoto: process.env.DEFAULT_PHOTO || 'String',
        },
    },
    //JWT CONFIGS
    jwt: {
        secret: process.env.JWT_SECURE || 'String'
    },
    //PASSPORT CONFIGS
    users: {
        defaultAdminPassword: proccess.env.DEFAULT_ADMIN_PASSWORD || 'String',
        defaultUserPassword: proccess.env.DEFAULT_USER_PASSWORD || 'String',
        publicApiKeyToken: process.env.PUBLIC_API_KEY_TOKEN || 'String',
        adminApiKeyToken: process.env.ADMIN_API_KEY_TOKEN || 'String',
    },
    //FOR MONGODB CONECTION. LOCAL or CLOUD.
    mongoDB: {
        MONGOuri: process.env.MONGO_URI || 'String',
    },
     //If you wanna implement a mongoDB service as microservice.
    mongoService: {
       
    },
    //CLIENT WILL RECIEVE ROUTE OF THE ERROR IN THE 'dev' MODE
    mode: process.env.DEPLOY_MODE || 'dev',
};

module.exports = configs;