require('dotenv').config({ path: 'variables.env' });
const webpack = require('webpack');

module.exports = {
    webpack: (config) => {
        config.plugins.push(
            new webpack.EnvironmentPlugin(process.env)
        );

        return config;
    }
};