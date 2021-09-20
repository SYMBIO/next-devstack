const webpack = require('webpack');
const symbio = require('../symbio.config.json');
module.exports = {
    stories: ['../src/**/*.stories.tsx'],
    webpackFinal: async (config) => {
        config.module.rules.push({
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
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
        'storybook-addon-next-router',
        {
            name: '@storybook/addon-postcss',
            options: {
                postcssLoaderOptions: {
                    implementation: require('postcss'),
                },
            },
        },
    ],
};
