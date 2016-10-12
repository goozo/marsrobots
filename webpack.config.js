module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname + '/dist',
    publicPath: '/dist',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'stage-1']
      }
    },{ 
      test: /\.css$/, 
      loader: 'style-loader!css-loader?modules' 
    }]
  },
  devtool: 'inline-source-map',
  externals: {
    'cheerio': 'window',
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  },
  resolve: {
    extensions: ['', '.js'],
    modulesDirectories: [
      'src',
      'node_modules'
    ]
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './dist',
    inline: true
  }
};