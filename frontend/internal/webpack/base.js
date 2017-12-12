import path from 'path';
import webpack from 'webpack';

const dllPlugins = ['vendor', 'redux', 'react'].map(
  lib =>
    new webpack.DllReferencePlugin({
      context: '.',
      manifest: path.join(process.cwd(), 'dll', `${lib}-manifest.json`)
    })
);
export default {
  target: 'web',
  module: {
    rules: [
      { test: /\.js?$/, exclude: /node_modules/, loaders: ['babel-loader'] },
      {
        test: /\.ejs?$/,
        exclude: /node_modules/,
        loaders: ['ejs-loader']
      }
    ]
  },
  plugins: dllPlugins,
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['*', '.js', '.json']
  }
};
