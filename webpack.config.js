const path = require('path');
const webpack = require('webpack');

const serverConfig = {
  target: 'node',
  entry: {
      bundle: './src/index.js',
      command: './test/spec/index.js'
  },
  output: {
  filename: '[name].js',
  path: path.resolve(__dirname, 'dist')
},
  node: {
    __dirname: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['babel-loader','remove-flow-types-loader'],
        include: [
          path.join(__dirname, 'src'),
          path.join(__dirname, 'test'),
          path.resolve(__dirname, "node_modules")
        ],
      },
      {
        test: /\.css$/,
        use: 'raw-loader'
      }
    ],
  },
  plugins: [
    new webpack.BannerPlugin({banner: '#!/usr/bin/env node', raw: true})
  ],
}

const webConfig = {
  target: 'web',
  entry: './test/demo/demo.js',
  output: {
    filename: 'demo.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['babel-loader','remove-flow-types-loader'],
        include: [
          path.join(__dirname, 'src'),
          path.join(__dirname, 'test'),
          path.resolve(__dirname, "node_modules"),
        ],
      },
      {
        test: /\.css$/,
        use: 'raw-loader'
      }
    ],
  }
}

module.exports = [ serverConfig, webConfig ]
