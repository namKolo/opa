// @flow
const merge = require('lodash/merge');

const config = {
  all: {
    env: process.env.NODE_ENV || 'development',
    isDev: process.env.NODE_ENV !== 'production',
    basename: process.env.PUBLIC_PATH,
    isBrowser: typeof window !== 'undefined',
    apiUrl: 'http://localhost:3002/v1'
  },
  test: {},
  development: {},
  production: {
    apiUrl: ''
  }
};

module.exports = merge(config.all, config[config.all.env]);
