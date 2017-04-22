import Path from 'path';
import webpack from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const path = (...parts) => Path.resolve(__dirname, ...parts);

export default {
    entry: ['babel-polyfill', path('src', 'index.js')],
    devtool: 'none',
    target: 'node',
    output: {
        libraryTarget: 'commonjs',
        library: 'handler',
        filename: 'index.js',
        path: path('dist')
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        loaders: [
            { test: /\.json$/, loader: 'json-loader' },
            { test: /\.(js|jsx)$/, loader: 'babel-loader' }
        ]
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(true),
        new CopyWebpackPlugin([{ from: 'serverless.yml' }])
    ]
};
