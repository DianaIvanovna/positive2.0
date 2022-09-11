const HtmlWebPackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');

const ENV = dotenv.config().parsed;

module.exports = {
  context: __dirname,
  name: 'config',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public_html'),
    filename: 'local/templates/positive/bundles/main.js',
    publicPath: '/',
  },
  devServer: {
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
      },
      {
        // test: /\.s[ac]ss$/i,
        test: /\.(sc|sa|c)ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|svg|gif|pdf)?$/,
        loader: 'file-loader',
        options: {
          outputPath: './local/templates/positive/bundles/images',
        },
      },
      {
        test: /\.(?:|eot|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          outputPath: './local/templates/positive/bundles/fonts',
        },
      },
      {
        test: /\.(mp3|wav)?$/,
        loader: 'file-loader',
        options: {
          outputPath: './local/templates/positive/bundles/audio',
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      process: {
        env: {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
          url: JSON.stringify('/'),
          ENV: JSON.stringify({ ...ENV }),
        },
      },
    }),
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, 'index.html'),
      filename: 'index.html',
    }),
    new ESLintPlugin({ context: './src' }),
  ],
};
