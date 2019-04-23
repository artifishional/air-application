const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = [{
    mode: "development",
    node: {
        setImmediate: false
    },
    entry: {
        'm2': `${__dirname}/src/m2.js`,
    },
    output: {
        path: `${__dirname}/dist`,
        filename: `[name].js`
    },
    target: 'web',
    plugins: [
        new HtmlWebpackPlugin({
            inject: false,
            entryUnit: "master",
            title: 'm2',
            template: './src/m2.html'
        })
    ],
}];