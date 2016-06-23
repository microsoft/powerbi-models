module.exports = {
  entry: './test/protocol.spec.ts',
  output: {
    path: __dirname + "/tmp",
    filename: 'protocol.spec.js'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
  },
  module: {
    loaders: [
      { test: /\.map$/, loader: 'ignore-loader' },
      { test: /\.d.ts$/, loader: 'ignore-loader' },
      { test: /\.ts$/, exclude: /\.d.ts$/, loader: 'ts-loader' },
      { test: /\.json$/, loader: 'json-loader' }
    ]
  },
  ts: {
    configFileName: "webpack.test.tsconfig.json"
  }
}