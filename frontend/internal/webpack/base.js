export default {
  target: 'web',
  module: {
    rules: [{ test: /\.js?$/, exclude: /node_modules/, loaders: ['babel-loader'] }]
  }
};
