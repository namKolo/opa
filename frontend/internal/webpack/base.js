import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const sourcePath = path.resolve(process.cwd(), 'src/index.js');
const buildPath = path.resolve(process.cwd(), 'public/build');

export default {
  devtool: 'cheap-module-source-map',
  entry: {
    app: [sourcePath]
  },
  target: 'web',
  output: {
    path: buildPath,
    // The bundled files will be available in the browser under this path. It is used for webpack-dev-server
    publicPath: '/',
    filename: '[name].js'
  },
  module: {
    rules: [{ test: /\.js?$/, exclude: /node_modules/, loaders: ['babel-loader'] }]
  },
  plugins: [
    // HMR purpose
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/template.html'
    })
  ]
};
