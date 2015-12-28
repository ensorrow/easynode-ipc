var webpack = require('webpack');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var HtmlwebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var path = require('path');

var devFlagPlugin = new webpack.DefinePlugin({
    __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
});

var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

module.exports = {
    entry: [
        //'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:8080',
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
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react']
                },
                include: path.join(__dirname,'.')
            }
        ]
    },
    plugins:[
       /* new uglifyJsPlugin({
            compress:{
                warnings:false
            }
        }),*/
       /* new HtmlwebpackPlugin({
            title: 'webpack-demos'
        }),*/
        new OpenBrowserPlugin({
            url:'http://localhost:8080/index.html'
        }),
        devFlagPlugin,
        /*new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery":"jquery"
        }),*/
        //new webpack.HotModuleReplacementPlugin()
    ],
    //devtool:"source-map"
}