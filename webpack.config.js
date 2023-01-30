const HtmlWebPackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const dotenv = require("dotenv");

const ENV = dotenv.config().parsed;

module.exports = {
    context: __dirname,
    name: "config",
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "public_html"),
        filename: "wp-content/themes/pozitiv/js/main.js",
        publicPath: "/",
    },
    resolve: {
        alias: {
            src: path.resolve(__dirname, "src/"),
            store: path.resolve(__dirname, "src/store"),
            img: path.resolve(__dirname, "public_html/wp-content/themes/pozitiv/img"),
        },
    },
    devServer: {
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: "babel-loader",
            },
            {
                test: /\.(sc|sa|c)ss$/i,
                use: [
                    "style-loader",

                    {
                        loader: "css-loader?modules",
                        options: {
                            modules: {
                                auto: /\.module\.(sc|sa|c)ss$/i,
                                localIdentName: "[local]--[hash:base64:5]",
                            },
                        },
                    },

                    "sass-loader",
                ],
            },

            {
                test: /\.(png|jpg|jpeg|svg|gif|pdf|webp)?$/,
                loader: "file-loader",
                options: {
                    outputPath: "./wp-content/themes/pozitiv/js/images",
                },
            },
            {
                test: /\.(?:|eot|ttf|woff|woff2)$/,
                loader: "file-loader",
                options: {
                    outputPath: "./wp-content/themes/pozitiv/js/fonts",
                },
            },
            {
                test: /\.(mp3|wav)?$/,
                loader: "file-loader",
                options: {
                    outputPath: "./wp-content/themes/pozitiv/js/audio",
                },
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            process: {
                env: {
                    NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                    url: JSON.stringify("/"),
                    ENV: JSON.stringify({...ENV}),
                },
            },
        }),
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, "index.html"),
            filename: "index.html",
        }),
        new ESLintPlugin({context: "./src"}),
    ],
};
