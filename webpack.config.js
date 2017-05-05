process.noDeprecation = true

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const ENV = process.env.NODE_ENV || 'development';
const HTMLPluginConfig = 

module.exports = {
  context: path.resolve(__dirname, "source"),
  entry: {
    index: './javascript/index.js',
  },
  output: {
    path:  path.resolve(__dirname, 'public'),
    publicPath: '/',
    filename: ENV === 'production' ? '[name].[chunkhash].js' : '[name].js',
  },
  stats: {
    colors: true,
    reasons: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [{
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [
              ['es2015', { modules: false }],
              'react',
            ],
            plugins: [
              'transform-object-rest-spread',
              ['transform-react-jsx', { 'pragma': 'h' }],
              'syntax-dynamic-import',
            ]
          }
        }]
      },
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader', 
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [require('autoprefixer')({ browsers: ['last 2 versions'] })],
              }
            }, 
            'stylus-loader'
          ]
        })
      },
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    port: 3000,
    hot: true,
    overlay: true,
    historyApiFallback: true,
  },
  devtool: ENV === 'production' ? 'source-map' : 'cheap-module-eval-source-map',

  plugins: ([
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'source/index.html'),
      minify: { collapseWhitespace: true }
    }),
    new ExtractTextPlugin({
      filename: '[name].[contenthash].css',
			allChunks: true,
			disable: ENV!=='production'
		}),
  ]).concat(ENV==='production' ? [] : [
    new webpack.HotModuleReplacementPlugin(),
  ])
};