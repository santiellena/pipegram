const configs = {
    port: process.env.SSR_PORT || 3001,
    host: process.env.SSR_HOST || 'http://localhost',
    apiUrl: process.env.API_URL || 'http://localhost:3000/',
    apiKeyToken: process.env.API_KEY_TOKEN || 'a6586ab75deabcd34a082f597bfa1b09a218720dd8af6a3ffded809237bfb08e',
    mode: process.env.SSR_MODE || 'dev',
};

module.exports = configs;