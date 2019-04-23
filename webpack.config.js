const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = [{
    mode: "development",
    node: {
        setImmediate: false
    },
    entry: {
        'm2': `${__dirname}/src/m2.js`,
    },
    externals: {
        "gsap": "window"
    },
    output: {
        path: `${__dirname}/dist`,
        filename: `[name].js`
    },
    target: 'web',
    plugins: [
        new HtmlWebpackPlugin({
            entryUnit: "master",
            title: 'm2',
            template: './src/m2.html'
        })
    ],
}];