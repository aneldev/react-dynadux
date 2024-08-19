// help: http://webpack.github.io/docs/configuration.html
// help: https://webpack.github.io/docs/webpack-dev-server.html#webpack-dev-server-cli
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const loaders = require('./webpack.loaders');
const plugins = require('./webpack.plugins');

const serverPort = Number(process.argv[process.argv.length - 1]);

console.log('To dev open address: http://localhost:' + serverPort + ' on any browser');
console.log('');

process.traceDeprecation = true;

/**
 * @type {import('webpack').Configuration}
 */
const config = {
  target: "web",
  mode: "development",
  entry: [
    'webpack-dev-server/client?http://localhost:'+serverPort, // bundle the client for webpack-dev-server and connect to the provided endpoint
    'webpack/hot/only-dev-server',                            // bundle the client for hot reloading, only- means to only hot reload for successful updates
    path.resolve(__dirname, 'dev/index.tsx'),
  ],
  optimization: {
    usedExports: true,       // true to remove the dead code, for more https://webpack.js.org/guides/tree-shaking/
  },
  devtool: "source-map",     // help: https://webpack.js.org/configuration/devtool/
  devServer: {
    hot: true,
    host: 'localhost',
    port: serverPort,
    historyApiFallback: true,
    proxy: [
      {
        context: ["/api"],
        target: "http://localhost:3222",
        secure: false,
        logLevel: "info"
      },
    ],
    devMiddleware: {
      publicPath: "/",
      writeToDisk: true,  // Writes files to disk (optional)
    },
  },
  watchOptions: {
    poll: true,
    ignored: /node_modules/,
  },
  output: {
    path: path.resolve(__dirname, 'dev/public/static'),
    filename: 'bundle.js'
  },
  resolve: {
    alias: {},
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".jsx"]
  },
  module: {
    rules: loaders.module.rules,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Hot Module Replacement',
      template: path.resolve(__dirname, 'dev/public/index.html'),
    }),
    new ReactRefreshWebpackPlugin(),
  ].concat(plugins.plugins),
};

module.exports = config;
