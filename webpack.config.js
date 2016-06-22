'use strict';

module.exports = {
    entry: './index',
    output: {
        library: 'CoheStore',
        libraryTarget: 'umd',
        filename: 'cohestore.js',
        path: './dist/'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'stage-0']
                }
            }
        ]
    }
};
