const webpack = require('webpack');
require('dotenv').config({ path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env' });

module.exports = {
    webpack: (config) => {
        config.plugins.push(
            new webpack.EnvironmentPlugin(process.env)
        );

        return config;
    }
};