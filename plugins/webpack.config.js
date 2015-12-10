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
            {
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                loader: 'babel-loader?presets[]=es2015&presets[]=react'
            },
        ]
    }
}