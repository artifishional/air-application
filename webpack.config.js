const CopyWebpackPlugin = require('copy-webpack-plugin');

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
        new CopyWebpackPlugin([
            { from: `${__dirname}/fill`, to: './' },
        ], {
            copyUnmodified: true
        }),
    ],
}];