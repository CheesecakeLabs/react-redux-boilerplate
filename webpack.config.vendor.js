const path = require('path')

const webpack = require('webpack')
const CompressionPlugin = require('compression-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')

module.exports = {
  entry: {
    vendor: [
      '@cheesecakelabs/fetch',
      'immutable',
      'react',
      'react-dom',
      'react-immutable-proptypes',
      'react-redux',
      'react-router',
      'react-router-redux',
      'redux',
      'redux-define',
      'redux-promise-middleware',
    ],
  },

  output: {
    filename: '[name].[chunkhash].js',
    path: path.join(__dirname, 'dist'),
    library: '[name]_lib',
  },

  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        screw_ie8: true,
        warnings: false,
      },
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
    new webpack.DllPlugin({
      path: path.join('dist', '[name]-manifest.json'),
      name: '[name]_lib',
    }),
    new CompressionPlugin({
      test: /\.(js|css)$/,
      threshold: 10240,
    }),
    new ManifestPlugin({
      fileName: 'vendor.stats.json',
    }),
  ],
}
