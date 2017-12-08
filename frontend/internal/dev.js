import path from 'path';
import webpack from 'webpack';
import webpackDevServer from 'webpack-dev-server';

import webpackConfig from './webpack/dev';

const compiler = webpack(webpackConfig);
const devServerOptions = {
  // The bundled files will be available in the browser under this path.
  publicPath: webpackConfig.output.publicPath,
  contentBase: path.join(process.cwd(), 'public', 'build'),
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
