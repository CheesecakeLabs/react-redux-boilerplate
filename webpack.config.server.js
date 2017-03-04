const path = require('path')

const webpack = require('webpack')

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
      'fetch': () => new Promise(() => {})
    }),
  ],
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      options: {
        presets: ['react'],
      },
    }],
  },
}
