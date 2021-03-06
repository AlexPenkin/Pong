const { CheckerPlugin } = require('awesome-typescript-loader');

module.exports = {
    entry: './src/main.ts',
    devtool: 'source-map',
    output: {
        filename: 'main.js',
        path: __dirname + '/dist/',
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: 'awesome-typescript-loader',
            exclude: /node_modules/,
        }],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new CheckerPlugin(),
    ],
};
