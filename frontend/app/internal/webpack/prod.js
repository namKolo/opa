import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import baseConfig from './base';

const sourcePath = path.resolve(process.cwd(), 'src/index.js');
const buildPath = path.resolve(process.cwd(), 'public/build');
const dllBuildPath = path.join(process.cwd(), 'public', 'build', 'dll');
const vendorFiles = fs
  .readdirSync(dllBuildPath)
  .map(file => {
    if (file.indexOf('dll.') >= 0) {
      return '/' + file;
    }
    return null;
  })
  .filter(Boolean);

export default merge(baseConfig, {
  devtool: 'cheap-module-source-map',
  entry: {
    app: ['babel-polyfill', sourcePath]
  },
  output: {
    path: buildPath,
    // Add cache busting via chunkhash so that all of the output files have different hashes.
    // Each files’ hash will stay the same with each build unless its file contents have changed.
    filename: '[name].[chunkhash].js'
  },
  plugins: [
    new CleanWebpackPlugin(buildPath, { allowExternal: true, exclude: ['dll'] }),
    // define environment
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    // uglify js
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true
      },
      output: {
        comments: false
      }
    }),

    // automatically generate index.html with injected built javascript code
    new HtmlWebpackPlugin({
      template: 'public/template.ejs',
      // output file name
      filename: 'index.html',
      inject: true,
      vendorFiles,
      // minify code
      minify: {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true
      }
    })
  ]
});
