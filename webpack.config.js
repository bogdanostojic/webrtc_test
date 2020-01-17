const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    // entry: ['babel-polyfill','./src/index.js'],
    entry: {
      'admin': './src/page/admin.js',
      'visitor': './src/page/visitor.js'
    },
    // watch: true,
    target: 'web',
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name]--[contenthash].css'
      }),
      new HtmlWebpackPlugin({
        title: 'admin.html',
        filename: 'admin.html',
        template: './src/template/admin.html',
        chunks: ['admin', 'vendors']
      }),
      new HtmlWebpackPlugin({
        title: 'visitor.html',
        filename: 'visitor.html',
        template: './src/template/visitor.html',
        chunks: ['visitor', 'vendors']
      }),
      new HtmlWebpackPlugin({
        title: 'index.html',
        filename: 'index.html',
        template: './src/template/index.html',
        excludeChunks: ['vendors', 'visitor', 'admin']
        // chunks: ['visitor', 'vendors']
      }),
      new WebpackBuildNotifierPlugin({
        title: "Yeya",
        successIcon: path.resolve("./img/db.png"),
        logo: path.resolve("./img/lol.png"),
      }),
      // new webpack.DefinePlugin(require('./features.js')),
      // new BundleAnalyzerPlugin()
    ],
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/i,
          use: [
            // 'style-loader', //  3. Inject styles into DOM
            MiniCssExtractPlugin.loader,
            'css-loader',   //  2. Turn css into commonjs
            'sass-loader'   //  1. Turn sass into css
          ],
        },
        {
          test: /\.(mjs|js)$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
          }
        }
      ],
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      },
      // minimize: true
    },
    output: {
      path: path.resolve(__dirname, 'public'),
      filename: '[name]-[contenthash].js',
      library: 'App',
    }
}