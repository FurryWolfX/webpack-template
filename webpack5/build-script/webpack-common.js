const path = require("path");
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');

/**
 * 基础配置
 */
module.exports = {
  stats: 'errors-only',
  mode: process.env.NODE_ENV,
  entry: path.resolve(__dirname, "../src/main.ts"),
  output: {
    filename: '[name].bundle.js',
    chunkFilename: "[name].chunk.js",
    path: path.resolve(__dirname, "../dist"),
    clean: true,
  },
  resolve: {
    extensions: [".mjs", ".js", ".ts"],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: [
    new SimpleProgressWebpackPlugin({
      format: 'compact', // simple compact expanded
    }),
  ],
};
