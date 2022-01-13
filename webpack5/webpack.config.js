const {merge} = require("webpack-merge");
const webpackCommon = require("./build-script/webpack-common");
const webpackBrowser = require("./build-script/webpack-browser");
const webpackBrowserVue = require("./build-script/webpack-browser-vue");

module.exports = merge(webpackCommon, webpackBrowser, webpackBrowserVue);