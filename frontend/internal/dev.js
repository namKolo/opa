import webpack from 'webpack';
import webpackDevServer from 'webpack-dev-server';

import webpackConfig from './webpack/base';

// Automatic Refresh and
webpackConfig.entry.app.unshift(
  // There is no inline: true flag in the webpack-dev-server configuration, because the webpack-dev-server module has no access to the webpack configuration.
  // Instead, the user must add the webpack-dev-server client entry point to the webpack configuration.
  // To do this, simply add the following to all entry points: webpack-dev-server/client?http://«path»:«port»/
  'webpack-dev-server/client?http://localhost:8080/',

  //Three changes are needed:
  // add an entry point to the webpack configuration: webpack/hot/dev-server.
  // add the new webpack.HotModuleReplacementPlugin() to the webpack configuration.
  // add hot: true to the webpack-dev-server configuration to enable HMR on the server.
  'webpack/hot/dev-server'
);

const compiler = webpack(webpackConfig);
const devServerOptions = {
  // The bundled files will be available in the browser under this path.
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true
  },
  // HMR purpose
  hot: true
};

const server = new webpackDevServer(compiler, devServerOptions);
server.listen(8080, 'localhost', () => {
  // eslint-disable-next-line
  console.log('Starting server on http://localhost:8080');
});
