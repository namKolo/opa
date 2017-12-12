const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const buildPath = path.join(process.cwd(), 'public', 'build', 'dll');

export default (env = 'developement') => {
  const plugins = [
    new CleanWebpackPlugin(buildPath, { allowExternal: true }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    }),
    new webpack.DllPlugin({
      context: '.',
      path: path.join(process.cwd(), 'dll', '[name]-manifest.json'),
      name: '[name]_[hash]'
    }),
    new webpack.optimize.OccurrenceOrderPlugin()
  ];

  if (env === 'production') {
    plugins.push(new webpack.optimize.UglifyJsPlugin());
  }

  return {
    entry: {
      vendor: ['lodash'],
      react: ['react', 'react-dom', 'react-redux'],
      redux: ['redux', 'redux-thunk']
    },
    output: {
      path: buildPath,
      filename: 'dll.[name].[hash].js',
      library: '[name]_[hash]'
    },
    plugins,
    resolve: {
      modules: ['src', 'node_modules'],
      extensions: ['*', '.js', '.json']
    }
  };
};
