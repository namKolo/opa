var path = require('path');
var webpack = require('webpack');

const buildPath = path.join(process.cwd(), 'public', 'build', 'dll');

module.exports = {
  entry: {
    vendor: ['lodash']
  },
  output: {
    path: buildPath,
    filename: 'dll.[name].[hash].js',
    library: '[name]_[hash]'
  },
  plugins: [
    new webpack.DllPlugin({
      context: '.',
      path: path.join(process.cwd(), 'dll', '[name]-manifest.json'),
      name: '[name]_[hash]'
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ],
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['*', '.js', '.json']
  }
};
