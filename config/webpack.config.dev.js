const path = require('path');
const webpack = require('webpack');
const CaseSensitivePlugin = require('case-sensitive-paths-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const {
  clientRoot,
  outputPath,
  optimization,
  publicPath,
  fileLoaders,
  alias,
  nodeModulePath,
} = require('./webpack_commons.js');
const devServer = require('./webpack_dev_server.js');

module.exports = {
  mode: 'development',

  // FIXME: webpack 5 has a bug, when set target to 'browserlist' breaks HMR
  // check: https://github.com/webpack/webpack-dev-server/issues/2758
  target: 'web',
  // target: 'browserslist',

  entry: {
    index: path.resolve(clientRoot, 'index.js'),
  },
  output: {
    path: outputPath,
    filename: '[name].js',
    publicPath,
  },
  optimization: {
    ...optimization,
    minimize: false,
  },
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
  },
  devtool: 'eval-cheap-module-source-map',
  plugins: [
    new CaseSensitivePlugin(),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.COMPILE_ENV': JSON.stringify('dev'),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(clientRoot, 'index_dev.html'),
      filename: '../index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin(),
  ],

  module: {
    rules: fileLoaders.concat([
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
        include: [clientRoot],
      },
      {
        test: /\.(js)$/,
        use: [],
        resolve: {
          // disable webpack module file type check for vendors
          fullySpecified: false,
        },
        include: [nodeModulePath],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
            },
          },
          'less-loader',
        ],
        include: [clientRoot],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
        include: [path.join(__dirname, '../node_modules')],
      },
    ]),
  },

  resolve: {
    alias,
  },
  devServer,
};
