import path from 'path';
import fs from 'fs';
import webpack from 'webpack';
import merge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import baseConfig from './base';

const sourcePath = path.resolve(process.cwd(), 'src/index.js');
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
    app: [
      'babel-polyfill',
      // There is no inline: true flag in the webpack-dev-server configuration, because the webpack-dev-server module has no access to the webpack configuration.
      // Instead, the user must add the webpack-dev-server client entry point to the webpack configuration.
      // To do this, simply add the following to all entry points: webpack-dev-server/client?http://«path»:«port»/
      'webpack-dev-server/client?http://localhost:1199/',
      //Three changes are needed:
      // add an entry point to the webpack configuration: webpack/hot/dev-server.
      // add the new webpack.HotModuleReplacementPlugin() to the webpack configuration.
      // add hot: true to the webpack-dev-server configuration to enable HMR on the server.
      'webpack/hot/dev-server',
      // enable react-hot-loader
      'react-hot-loader/patch',
      sourcePath
    ]
  },
  output: {
    // The bundled files will be available in the browser under this path. It is used for webpack-dev-server
    publicPath: '/',
    filename: '[name].js'
  },
  plugins: [
    // define environment
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),

    // HMR purpose
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/template.ejs',
      inject: true,
      vendorFiles
    })
  ]
});
