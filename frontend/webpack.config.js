const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    'js/app': './src/app.js'
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.art$/,
        exclude: /(node_modules)/,
        loader: "art-template-loader",
        options: {
          // art-template options (if necessary)
          // @see https://github.com/aui/art-template
          escape: false,
        }
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8192
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './public/index.html'),
      filename: 'index.html',
      inject: true
    }),
    new CopyPlugin({
      patterns: [
        {
          from: './public/*.ico',
          to: path.join(__dirname, './dist/favicon.ico')
        },
        {
          from: './public/libs',
          to: path.join(__dirname, './dist/libs')
        },
      ]
    }),
    new CleanWebpackPlugin()
  ],
  devServer: {
    contentBase: path.join(__dirname, './dist'),
    hot: true,
    compress: true,
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
      },
    },
  },
  mode: 'development',
  devtool: 'source-map'
}