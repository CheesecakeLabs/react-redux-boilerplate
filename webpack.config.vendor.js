const webpack = require('webpack')
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  entry: {
    'vendor': [
      '@ckldeveloper/fetch',
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
      'redux-thunk',
    ]
  },

  output: {
    filename: '[name].bundle.js',
    path: 'dist/',
    // The name of the global variable which the library's
    // require() function will be assigned to
    library: '[name]_lib',
  },

  plugins: [
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
      // The path to the manifest file which maps between
      // modules included in a bundle and the internal IDs
      // within that bundle
      path: 'dist/[name]-manifest.json',
      // The name of the global variable which the library's
      // require function has been assigned to. This must match the
      // output.library option above
      name: '[name]_lib',
    }),
    new CompressionPlugin({
      test: /\.(js|css)$/,
      threshold: 10240,
    }),
  ],
}
