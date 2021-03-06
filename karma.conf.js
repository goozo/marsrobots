var webpackConfig = require('./webpack.config');

module.exports = function (config) {
  config.set({
    browsers: [ 'PhantomJS' ],
    files: [
      'test/tests.bundle.js'
    ],
    exclude: ['*.css'],  
    frameworks: [ 'chai', 'mocha' ],
    plugins: [
      'karma-phantomjs-launcher',
      'karma-chai',
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-sourcemap-loader',
      'karma-webpack',
    ],
    preprocessors: {
      'test/tests.bundle.js': [ 'webpack', 'sourcemap' ]
    },
    reporters: [ 'mocha' ],
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true,
    }
  });
};