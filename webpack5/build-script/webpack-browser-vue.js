const {VueLoaderPlugin} = require('vue-loader');
/**
 * 拓展 Vue 相关
 */
module.exports = {
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
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
};