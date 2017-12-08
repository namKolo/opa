import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const sourcePath = path.resolve(process.cwd(), 'src/index.js');
const buildPath = path.resolve(process.cwd(), 'public/build');

export default {
  devtool: 'cheap-module-source-map',
  entry: sourcePath,
  target: 'web',
  output: {
    path: buildPath,
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [{ test: /\.js?$/, exclude: /node_modules/, loaders: ['babel-loader'] }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/template.html'
    })
  ]
};
