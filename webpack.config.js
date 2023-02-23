const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackLighthousePlugin = require('webpack-lighthouse-plugin');

module.exports = {
  entry: './src/index.js',
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new WebpackLighthousePlugin({
      url: 'http://localhost:8080',
    }),
  ],
  mode: 'development',
  devServer: {
    static: './dist',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
};