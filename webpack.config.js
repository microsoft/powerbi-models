module.exports = {
  mode: 'none',
  entry: {
    'models': './src/models.ts',
  },
  output: {
    path: __dirname + "/dist",
    filename: '[name].js',
    library: 'powerbi-models',
    libraryTarget: 'umd'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.js']
  },
  module: {
    rules: [
      { test: /\.map$/, loader: 'ignore-loader' },
      { test: /\.d.ts$/, loader: 'ignore-loader' },
      { test: /\.ts$/, exclude: /\.d.ts$/, loader: 'ts-loader' },
      { test: /\.json$/, loader: 'json-loader' }
    ]
  }
};