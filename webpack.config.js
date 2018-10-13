const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  entry: "./bootstrap.js",
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist"
  },
  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new HtmlWebpackPlugin({
      template: "./index.html",
      inject: false,
    })
  ],
  resolve: {
    alias: {
      // Use the Web version of the module in Webpack builds.
      "./runner": "./runner-web.js",
    }
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  // Fix dumb bug where benchmark.js's UMD variant is breaking Webpack.
  externals: {
    "benchmark": "Benchmark",
  }
};
