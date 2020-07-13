const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
    entry: './src/client/index.js',
    mode: 'development',
    module: {
        rules: [{
            test: /\.js$/,
            exclude: '/node_modules',
            loader: 'babel-loader'
        }, {
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader']
        }]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './src/client/views/index.html',
            filename: './index.html'
        })

    ]
}