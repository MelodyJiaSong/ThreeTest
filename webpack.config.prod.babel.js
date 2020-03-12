const path = require('path');
const config = {
    entry: [
        'babel-regenerator-runtime',
        path.resolve(__dirname, 'src/index.js')
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    mode: 'production',
    //devtool: 'inline-source-map',
    resolve: {
        extensions: ['.js', '.json', '.jsx']
    },
    module: {
        rules: [{
                test: /(\.js?)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /(\.css)$/,
                use: [{
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                //localIdentName: '[path][name]__[local]--[hash:base64:5]',
                            },
                        }
                    },

                ],
                exclude: /(overwrite.css)$/
            },
            {
                test: /(overwrite.css)$/,
                use: [{
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },

                ],
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'file-loader'
            },
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "fonts/[name].[ext]",
                    },
                },
            },
        ]
    }
};

module.exports = config;