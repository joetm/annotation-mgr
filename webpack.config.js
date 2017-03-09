var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
// var CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
  // context: path.join(__dirname, "src"),
  entry: {
    bundle: "./src/index.js"
  },
  output: {
    path: path.resolve('./build'),
    publicPath: '/',
    filename: "[name].js"
  },
  devtool: debug ? "inline-sourcemap" : null,
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          // cacheDirectory: true,
          presets: ['es2015', 'stage-0', 'react'],
          plugins: ['transform-decorators-legacy', 'react-html-attrs', 'transform-class-properties'],
        }
      },
      {
        test: /\.(ico|jpe?g|png|gif)$/,
        loader: "file-loader"
      },
      {
        test: /\.scss$/,
        exclude: [ /vendor/, /node_modules/, /repositories/, /venv/ ],
        loader: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: 'css-loader'
          })
      },
      {
        test: /\.css$/,
        loader: [ 'style-loader', 'css-loader' ].join("!")
      },
    ]
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json', '.scss', '.css']
  },
  plugins: debug ?
  //DEV
  [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new ExtractTextPlugin({ filename: 'css/[name].css', disable: false, allChunks: true })
  ]
  :
  // PROD
  [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin({ filename: 'css/[name].css', disable: false, allChunks: true }),
  	new webpack.optimize.UglifyJsPlugin({
        // mangle: false,
        compress: {
            warnings: false
        }
     })
  ]
};
