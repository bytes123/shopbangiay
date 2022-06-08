var WatchIgnorePlugin = require("watch-ignore-webpack-plugin");
var path = require("path");
var webpack = require("webpack");
plugins: [
  new WatchIgnorePlugin([
    path.resolve(__dirname, "./public/resource/productImages"),
  ]),
];
