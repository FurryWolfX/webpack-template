const path = require("path");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const WebpackBar = require('webpackbar');
const {VueLoaderPlugin} = require("vue-loader");

function resolve(str) {
  return path.resolve(__dirname, str)
}

/**
 * 基础配置
 */
module.exports = {
  stats: 'errors-warnings',
  mode: process.env.NODE_ENV,
  entry: resolve("src/main.ts"),
  output: {
    filename: '[name].bundle.js',
    chunkFilename: "[name].chunk.js",
    path: resolve("dist"),
    clean: true,
  },
  resolve: {
    extensions: [".mjs", ".js", ".ts"],
  },
  devtool: process.env.NODE_ENV === 'development' ? 'source-map' : undefined,
  devServer: {
    static: resolve('static'),
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
          },
        ],
      },
      {
        test: /\.(tsx?|m?jsx?)$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    "corejs": 3,
                    "useBuiltIns": "usage",
                    "loose": true,
                  }
                ],
                [
                  "@babel/preset-typescript",
                  {
                    isTSX: true,
                    allExtensions: true
                  }
                ]
              ],
              plugins: [
                ["@babel/plugin-proposal-decorators", {legacy: true}],
                ["@babel/plugin-proposal-class-properties", {loose: true}],
              ]
            },
          }
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.s?css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                  ],
                ],
              },
            }
          },
          'sass-loader',
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
    new WebpackBar(),
    new VueLoaderPlugin(),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        // 支持 vue 文件的类型检查
        extensions: {vue: true}
      }
    }),
    new HtmlWebpackPlugin({
      title: '管理输出',
      inject: 'body'
    }),
    new CopyPlugin({
      patterns: [
        {
          from: resolve("static"),
          to: resolve("dist"),
        },
      ],
    }),
  ],
};
