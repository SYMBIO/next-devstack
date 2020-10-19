const path = require('path');
module.exports = {
    stories: ['../src/components/**/**/*.stories.tsx'],
    webpackFinal: async (config) => {
        config.module.rules.push(
            {
                test: /\.(ts|tsx)$/,
                use: [
                    {
                        loader: require.resolve('babel-loader'),
                    },
                ],
            },
            {
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
            },
        );
        config.resolve.extensions.push('.ts', '.tsx');

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
