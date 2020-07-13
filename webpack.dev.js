const htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: "src/client/index.js",
    mode: 'development',
    rules: [{
        test: /\.js$/,
        exclude: 'node_modules',
        loader: 'babel-loader'
    }],
    plugins: [
        new htmlWebpackPlugin({
            template: './src/client/views/index.html',
            filename: './index.html'
        }),
        new CleanWebpackPlugin({
            // Simulate the removal of files
            dry: true,
            // Write Logs to Console
            verbose: true,
            // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        })

    ]
}