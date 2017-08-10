const webpack = require('webpack');
const path = require('path');

module.exports = {
  devtool: 'eval',
  entry: [
    './client/app'
  ],
  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, '/dist'),
    hot: true,
    port: 3000
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(), // For live reloading
    new webpack.NoEmitOnErrorsPlugin() // Makes sure Webpack will not compile if Errors
  ]
};
