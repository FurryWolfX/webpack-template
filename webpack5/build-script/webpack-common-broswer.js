const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: process.env.NODE_ENV,
  entry: "./src/main.ts",
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(process.cwd(), "dist"),
    clean: true,
  },
  resolve: {
    extensions: [".wasm", ".mjs", ".js", ".json", ".ts"],
  },
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
  },
  module: {
    rules: [
      {
        test: /\.(ts|m?js)$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  "corejs": 3,
                  "useBuiltIns": "usage",
                  "targets": "> 0.25%, not dead"
                }
              ],
              "@babel/preset-typescript",
            ],
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.s?css$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader'},
          {loader: 'sass-loader'},
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(csv|tsv)$/i,
        use: ['csv-loader'],
      },
      {
        test: /\.xml$/i,
        use: ['xml-loader'],
      },
    ],
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new SimpleProgressWebpackPlugin({
      format: 'compact', // simple compact expanded
    }),
    new HtmlWebpackPlugin({
      title: '管理输出',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(process.cwd(), "static"),
          to: path.resolve(process.cwd(), "dist"),
        },
      ],
    }),
  ],
};
