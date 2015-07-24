var webpack = require('webpack');

module.exports = {
  entry: './src/app.js',

  output: {
    filename: './dist/main.js'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  },

  // Don't silently fail
  bail: true
}

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins = [
    // For React
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),
    new webpack.optimize.OccurenceOrderPlugin()
  ];
}
