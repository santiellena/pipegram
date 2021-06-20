const configs = {
    port: process.env.SSR_PORT || 3001,
    host: process.env.SSR_HOST || 'String',
    
    apiKeyToken: process.env.API_KEY_TOKEN || 'Public Api Token',
};

module.exports = configs;