'use strict';

module.exports = {
    entry: './index',

    output: {
        library: 'DistributedStore',
        libraryTarget: 'umd',
        filename: 'distributed-store.js',
        path: './dist/'
    },

    module: {
        loaders: [
            {
                test: /^(.*)\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            }
        ]
    }
};
