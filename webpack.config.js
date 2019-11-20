const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = {
    mode: 'development',
    devtool: 'source-map',
    // entry: ['babel-polyfill','./src/index.js'],
    entry: './src/index.js',
    watch: true,
    target: 'web',
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name]-[contenthash].css'
      }),
      new HtmlWebpackPlugin({
        title: 'index.html',
        template: './src/index.html'
      }),
      new WebpackBuildNotifierPlugin({
        title: "Yeya",
        successIcon: path.resolve("./img/db.png"),
        logo: path.resolve("./img/lol.png"),
      }),
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
      }
    },
    output: {
      filename: '[name]-[contenthash].js',
      path: path.resolve(__dirname, 'public')
    }
}