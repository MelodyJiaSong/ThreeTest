const path = require("path");
const config = {
    entry: [
        "babel-regenerator-runtime",
        path.resolve(__dirname, "src/index.js")
    ],
    devServer: {
        contentBase: path.resolve(__dirname, "public"),
        port: 3001,
        open: true,
        historyApiFallback: true,
        disableHostCheck: true
    },
    output: {
        publicPath: "/",
        path: path.resolve(__dirname, "public"),
        filename: "bundle.js"
    },
    mode: "development",
    devtool: "source-map",
    resolve: {
        extensions: [".js", ".json", ".jsx"]
    },
    module: {
        rules: [{
            test: /(\.js?)$/,
            loader: "babel-loader",
            exclude: /node_modules/
        },
        {
            test: /(style.css)$/,
            use: [{
                loader: "style-loader"
            },
            {
                loader: "css-loader",
                options: {
                    modules: {
                        localIdentName: "[path][name]__[local]--[hash:base64:5]"
                    }
                }
            }
            ]
        },
        {
            test: /(\.css)$/,
            use: [{
                loader: "style-loader"
            },
            {
                loader: "css-loader"
            }
            ],
            exclude: /(style.css)$/
        },
        {
            test: /\.(jpe?g|png|gif|svg)$/i,
            loader: "file-loader"
        },
        {
            test: /\.(ttf|eot|woff|woff2)$/,
            use: {
                loader: "file-loader",
                options: {
                    name: "fonts/[name].[ext]"
                }
            }
        }
        ]
    }
};

module.exports = config;