const path = require('path');
const webpack = require('webpack');
const symbio = require('../symbio.config.json');
module.exports = {
    stories: ['../src/**/*.stories.tsx'],
    webpackFinal: async (config) => {
        config.module.rules.push({
            test: /\.scss$/,
            loaders: [
                require.resolve('style-loader'),
                {
                    loader: require.resolve('css-loader'),
                    options: {
                        importLoaders: 1,
                        modules: {
                            mode: 'local',
                            localIdentName: '[path][name]__[local]--[hash:base64:5]',
                            // localIdentName: '[sha1:hash:hex:4]',
                            context: path.resolve(__dirname, 'src'),
                            hashPrefix: 'my-custom-hash',
                        },
                    },
                },
                require.resolve('sass-loader'),
            ],
        });

        config.plugins.push(
            new webpack.DefinePlugin({
                'process.env.__NEXT_IMAGE_OPTS': JSON.stringify(symbio.images),
            }),
        );

        const fileLoaderRule = config.module.rules.find(
            (rule) => rule.test && !Array.isArray(rule.test) && rule.test.test('.svg'),
        );
        if (fileLoaderRule) {
            fileLoaderRule.exclude = /\.svg$/;
            config.module.rules.push({
                test: /\.svg$/,
                enforce: 'pre',
                loader: require.resolve('@svgr/webpack'),
            });
        }

        return config;
    },
    addons: [
        '@storybook/addon-docs',
        '@storybook/addon-controls',
        '@storybook/addon-actions',
        '@storybook/addon-viewport',
        '@storybook/addon-storysource',
        '@storybook/addon-backgrounds',
        '@storybook/addon-a11y',
    ],
};
