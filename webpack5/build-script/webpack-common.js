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
    path: path.resolve(process.cwd(), "dist"),
    clean: true,
  },
  resolve: {
    extensions: [".wasm", ".mjs", ".js", ".json", ".ts"],
  },
  plugins: [
    new SimpleProgressWebpackPlugin({
      format: 'compact', // simple compact expanded
    }),
  ],
};
