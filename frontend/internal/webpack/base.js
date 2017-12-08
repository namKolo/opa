import path from 'path';
import webpack from 'webpack';

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
  plugins: [
    // avoiding rebuilding third lib
    // reduce lots of incremental build time
    new webpack.DllReferencePlugin({
      context: '.',
      manifest: path.join(process.cwd(), 'dll', 'vendor-manifest.json')
    })
  ],
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['*', '.js', '.json']
  }
};
