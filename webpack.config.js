'use strict';

var path = require( 'path' )

module.exports = {
  entry: path.join( __dirname, 'client/main.js' ),
  output: {
    path: path.join( __dirname, 'public/javascripts' ),
    filename: 'main.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        'presets': ['es2015']
      }
    }]
  }
}