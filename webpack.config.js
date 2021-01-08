const webpack = require('webpack');
const WebpackBar = require('webpackbar');
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require("copy-webpack-plugin");

const ASSET_PATH = process.env.ASSET_PATH || '/';

const common = {
  mode: 'development',
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: ASSET_PATH,
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
      { test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$/, loader: 'file-loader', options: { name: 'assets/images/[name].[ext]' } },
    ],
  },
  plugins: [
    new WebpackBar({ name: 'client' }),
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, "public", "index.html"), favicon: path.resolve(__dirname, "public", "favicon.ico") }),
    new MiniCssExtractPlugin({
      filename: 'assets/style/[name].css',
      chunkFilename: 'assets/style/[id].css'
    }),
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
      { test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$/, loader: 'file-loader', options: { name: 'assets/images/[name].[ext]' } },
    ],
  },
  plugins: [
    new WebpackBar({ name: 'server' }),
    new CopyPlugin({
      patterns: [
        { from: "*.webmanifest", context: path.resolve(__dirname, "public") },
        { from: "*.txt", context: path.resolve(__dirname, "public") },
        { from: "*.png", to: 'assets/images', context: path.resolve(__dirname, "public") },
      ],
    }),
  ],
};

module.exports = [server, client];
