const path = require("path");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

/**
 * 浏览器 JS/TS/SASS/CSS/资源 相关
 */
module.exports = {
  devtool: process.env.NODE_ENV === 'development' ? 'source-map' : undefined,
  devServer: {
    static: path.resolve(__dirname, '../dist'),
  },
  module: {
    rules: [
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
  plugins: [
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
          from: path.resolve(__dirname, "../static"),
          to: path.resolve(__dirname, "../dist"),
        },
      ],
    }),
  ],
};