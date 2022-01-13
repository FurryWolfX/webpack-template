const {merge} = require("webpack-merge");
const webpackCommon = require("./build-script/webpack-common");
const webpackBrowser = require("./build-script/webpack-browser");

module.exports = merge(webpackCommon, webpackBrowser);