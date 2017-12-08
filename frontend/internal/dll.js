/*
 eslint-disable
*/
import webpack from 'webpack';
import config from './webpack/dll';

process.env.NODE_ENV = 'production';
// Pre built
webpack(config).run((error, stats) => {
  if (error) {
    // so a fatal error occurred. Stop here.
    console.log(error);
    return 1;
  }

  const jsonStats = stats.toJson();

  if (jsonStats.hasErrors) {
    return jsonStats.errors.map(error => console.log(error));
  }

  if (jsonStats.hasWarnings) {
    console.log('Webpack generated the following warnings: ');
    jsonStats.warnings.map(warning => console.log(warning));
  }

  console.log(`Webpack stats: ${stats}`);

  // if we got this far, the build succeeded.
  console.log("Your dll is compiled in production mode in /public/build/dll. It's ready to roll!");

  return 0;
});
/*
  eslint-enable
*/