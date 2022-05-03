const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const webpackStrip = require('strip-loader');

module.exports = merge(common, {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: '/node_modules/',
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                        },
                    },
                ],
            },
            {
                test: /\.js$/,
                loader: webpackStrip.loader('console.log')
            }
        ],
    },
});
