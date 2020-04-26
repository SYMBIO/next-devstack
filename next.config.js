/* eslint-disable no-undef */
require('dotenv').config();

const path = require('path');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');
const MomentTimezoneDataPlugin = require('moment-timezone-data-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const symbio = require('./symbio.config');

if (symbio.pageCache === 'redis' && !process.env.REDIS_URL) {
    console.error('Trying to use Redis page cache without REDIS_URL env variable!');
    process.exit(1);
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
    target: 'serverless',
    webpack: (config, { isServer }) => {
        config.plugins = config.plugins || [];

        config.plugins = [
            ...config.plugins,

            // Read the .env file
            new Dotenv({
                path: path.join(__dirname, '.env'),
                systemvars: true,
            }),

            new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /cs|en-gb/),
            new MomentTimezoneDataPlugin({
                startYear: new Date().getFullYear() - 1,
                endYear: new Date().getFullYear() + 2,
            }),
            new FaviconsWebpackPlugin({
                logo: './public/icons/favicon.svg',
                cache: true,
                prefix: 'icons/',
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
};

module.exports = withBundleAnalyzer(nextConfig);
