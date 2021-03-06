var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var FlowBabelWebpackPlugin = require('flow-babel-webpack-plugin');
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
  devtool: debug ? "inline-sourcemap" : "source-map", // false,
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
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      {
          test: /\.tsx?$/,
          loader: "awesome-typescript-loader"
      },
      // output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
          enforce: "pre",
          test: /\.js$/,
          loader: "source-map-loader"
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
    extensions: ['.jsx', '.js', '.ts', '.tsx', '.json', '.scss', '.css']
  },
  externals: {
      // "react": "React",
  },
  plugins: debug ?
  //DEV
  [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new ExtractTextPlugin({ filename: 'css/[name].css', disable: false, allChunks: true }),
    new FlowBabelWebpackPlugin()
  ]
  :
  // PROD
  [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': 'production'
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new ExtractTextPlugin({
      filename: 'css/[name].css',
      disable: false,
      allChunks: true
    })
    // new webpack.optimize.UglifyJsPlugin({
    //      // mangle: false,
    //      compress: {
    //          warnings: false
    //      }
    //   })
  ]
};
