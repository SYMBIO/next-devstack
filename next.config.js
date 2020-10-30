/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { i18n } = require('./symbio.config');
const withPWA = require('next-pwa');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
    i18n,
    target: 'serverless',
    webpack: (config, { isServer }) => {
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

module.exports = withBundleAnalyzer(withPWA(nextConfig));
