/* eslint-disable no-undef */
const webpack = require('webpack');
const MomentTimezoneDataPlugin = require('moment-timezone-data-webpack-plugin');
const symbio = require('./symbio.config');
const withPWA = require('next-pwa');

if (symbio.pageCache === 'redis' && !process.env.REDIS_URL) {
    console.error('Trying to use Redis page cache without REDIS_URL env variable!');
    process.exit(1);
}

const nextConfig = {
    target: 'serverless',
    webpack: (config, { isServer }) => {
        config.plugins = config.plugins || [];

        config.plugins = [
            ...config.plugins,

            new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /cs|en-gb/),
            new MomentTimezoneDataPlugin({
                startYear: new Date().getFullYear() - 1,
                endYear: new Date().getFullYear() + 2,
            }),
        ];

        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });

        const originalEntry = config.entry;
        config.entry = async () => {
            const entries = await originalEntry();

            if (entries['main.js'] && !entries['main.js'].includes('./polyfills.js')) {
                entries['main.js'].unshift('./polyfills.js');
            }

            return entries;
        };

        if (!isServer) {
            config.node = {
                fs: 'empty',
                net: 'empty',
                tls: 'empty',
            };
        }

        return config;
    },
    pwa: {
        dest: 'public',
        disable: process.env.NODE_ENV === 'development',
    },
};

module.exports = withPWA(nextConfig);
