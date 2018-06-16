const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: {
    app: ['./src/App.js'],
    vendor: ['react', 'react-dom', 'babel-polyfill'],
  },
  output: {
    path: path.join(__dirname, 'static'),
    filename: '[name].bundle.js',
  },
  plugins: [
    // disable 'Download the React DevTools for a better development experience' message
    new webpack.DefinePlugin({
      '__REACT_DEVTOOLS_GLOBAL_HOOK__': '({ isDisabled: true })',
    }),
  ],
  // split bundle
  optimization: {
    runtimeChunk: {
      name: 'vendor',
    },
    splitChunks: {
      cacheGroups: {
        common: 'vendor',
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'env'],
        },
      },
    ],
  },
};
