import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import baseConfig from './base';

const sourcePath = path.resolve(process.cwd(), 'src/index.js');
const buildPath = path.resolve(process.cwd(), 'public/build');

export default merge(baseConfig, {
  devtool: 'cheap-module-source-map',
  entry: {
    app: [sourcePath]
  },
  output: {
    path: buildPath,
    // Add cache busting via chunkhash so that all of the output files have different hashes.
    // Each files’ hash will stay the same with each build unless its file contents have changed.
    filename: '[name].[chunkhash].js'
  },
  plugins: [
    // define environment
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    // automatically generate index.html with injected built javascript code
    new HtmlWebpackPlugin({
      template: 'public/template.html'
    })
  ]
});
