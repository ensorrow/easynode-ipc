var webpack = require('webpack');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var HtmlwebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

var devFlagPlugin = new webpack.DefinePlugin({
    __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
});

var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

module.exports = {
    entry: {
        app: './js/main.js',
    },
    output: {
        filename: './build/bundle.js'
    },
    module: {
        loaders:[
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=81920'},
            { test: /\.css$/, loader: 'style-loader!css-loader?modules' },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            },
        ]
    },
    plugins:[
        new uglifyJsPlugin({
            compress:{
                warnings:false
            }
        }),
        new HtmlwebpackPlugin({
            title: 'webpack-demos'
        }),
        new OpenBrowserPlugin({
            url:'http://localhost:8080/views/index.html'
        }),
        devFlagPlugin,
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery":"jquery"
        })
    ]
}