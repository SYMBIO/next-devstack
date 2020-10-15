/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack');
const { i18n } = require('./symbio.config');
const withPWA = require('next-pwa');

const nextConfig = {
    experimental: {
        i18n,
    },
    target: 'serverless',
    webpack: (config, { isServer }) => {
        config.plugins = config.plugins || [];

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
