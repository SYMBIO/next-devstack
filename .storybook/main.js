const path = require('path');
module.exports = {
    stories: ['../src/components/**/**/*.stories.tsx'],
    webpackFinal: async (config) => {
        config.module.rules.push({
            test: /\.(ts|tsx)$/,
            use: [
                {
                    loader: require.resolve('babel-loader'),
                },
            ],
        });
        config.module.rules.push({
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader'],
            include: path.resolve(__dirname, '../'),
        });
        config.resolve.extensions.push('.ts', '.tsx');
        return config;
    },
    addons: [
        '@storybook/addon-controls',
        '@storybook/addon-docs',
        '@storybook/addon-actions',
        '@storybook/addon-viewport',
        '@storybook/addon-storysource',
        '@storybook/addon-backgrounds',
        '@storybook/addon-a11y',
    ],
};
