const path = require('path')

module.exports = {
  entry: './src/js/entry.js',
  output: {
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.ejs', '.css']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: ['babel-loader', 'eslint-loader'],
        exclude: /node_modules/
      },
    ]
  }
}
