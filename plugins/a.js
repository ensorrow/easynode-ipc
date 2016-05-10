var webpack = require('webpack');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var HtmlwebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var path = require('path');

var devFlagPlugin = new webpack.DefinePlugin({
    __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
});

var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

var query = {
    presets: ['es2015', 'react'],
    plugins: ['transform-es3-member-expression-literals', 'transform-es3-property-literals']
};
var filter = 'babel?' + JSON.stringify(query);
module.exports = {
    entry: [
        './js/index.js'
    ],
    output: {
        filename: './build/bundle.js'
    },
    module: {
        loaders:[
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=81920'},
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                // es3ify required for IE8
                loaders: ['es3ify', filter],
                include: path.join(__dirname,'.')
            }
        ]
    },
    plugins:[

    ],
    devtool:"source-map"
}
