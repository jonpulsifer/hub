const webpack = require('webpack');
const WebpackBar = require('webpackbar');
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const nodeExternals = require('webpack-node-externals');

const common = {
  mode: 'development',
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  output: {
    filename: '[name].js',
    publicPath: '/',
  },
};

const client = {
  ...common,
  name: 'client',
  target: 'web',
  entry: {
    client: path.resolve(__dirname, 'src', 'client'),
  },
  module: {
    rules: [
      { test: /\.(j|t)sx?$/, use: 'ts-loader', exclude: /node_modules/ },
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, "css-loader"], },
    ],
  },
  plugins: [
    new WebpackBar({ name: 'client' }),
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, "public", "index.html"), }),
    new MiniCssExtractPlugin(),
  ],
};

const server = {
  ...common,
  name: 'server',
  target: 'node',
  entry: {
    server: path.resolve(__dirname, 'src', 'server'),
  },
  externals: [nodeExternals()], 
  module: {
    rules: [
      { test: /\.(j|t)sx?$/, use: 'ts-loader', exclude: /node_modules/ },
    ],
  },
  plugins: [
    new WebpackBar({ name: 'server' }),
  ],
};

module.exports = [server, client];
