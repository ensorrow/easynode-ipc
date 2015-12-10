var webpack = require('webpack');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

module.exports = {
    entry: {
        bundle: './js/main.js',
        bundle2: './js/main2.js'
    },
    output: {
        filename: './build/[name].js'
    },
    module: {
        loaders:[
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=81920'},
            { test: /\.css$/, loader: 'style-loader!css-loader?modules' },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',
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
        })
    ],
}