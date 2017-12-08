import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import baseConfig from './base';

const sourcePath = path.resolve(process.cwd(), 'src/index.js');

export default merge(baseConfig, {
  devtool: 'cheap-module-source-map',
  entry: {
    app: [
      // There is no inline: true flag in the webpack-dev-server configuration, because the webpack-dev-server module has no access to the webpack configuration.
      // Instead, the user must add the webpack-dev-server client entry point to the webpack configuration.
      // To do this, simply add the following to all entry points: webpack-dev-server/client?http://«path»:«port»/
      'webpack-dev-server/client?http://localhost:8080/',
      //Three changes are needed:
      // add an entry point to the webpack configuration: webpack/hot/dev-server.
      // add the new webpack.HotModuleReplacementPlugin() to the webpack configuration.
      // add hot: true to the webpack-dev-server configuration to enable HMR on the server.
      'webpack/hot/dev-server',
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
      template: 'public/template.html'
    })
  ]
});
