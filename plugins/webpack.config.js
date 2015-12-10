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
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react']
                }
            },
        ]
    }
}