const configs = {
    port: process.env.SSR_PORT || 3001,
    host: process.env.SSR_HOST || 'http://localhost',
    apiUrl: process.env.API_URL || 'http://localhost:3000/',
    apiKeyToken: process.env.API_KEY_TOKEN || 'a6586ab75deabcd34a082f597bfa1b09a218720dd8af6a3ffded809237bfb08e',
    mode: process.env.SSR_MODE || 'dev',
    oauth: {
        googleIdClient: '142666905100-hj4qtp7vb0nm3qb1n4nqkp7136mdmlkt.apps.googleusercontent.com',
        googleClientSecret: 'G-mg6-aqqfrC9ALqJqGnq5EP',
    },
};

module.exports = configs;