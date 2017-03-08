const path = require('path')

const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: './src/server.js',
  target: 'node',
  output: {
    path: path.join(__dirname, 'dist-server'),
    filename: 'server.js',
    publicPath: '/static/',
  },
  resolve: {
    modules: [
      path.join(__dirname, 'src'),
      'node_modules',
    ],
    extensions: ['.js'],
  },
  plugins: [
    new webpack.DefinePlugin({
      fetch: () => new Promise(() => {}),
    }),
    new ExtractTextPlugin('styles.css'),
  ],
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      options: {
        presets: ['react'],
      },
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('css-loader?modules&importLoaders=1'),
      exclude: /node_modules/,
    }],
  },
}
