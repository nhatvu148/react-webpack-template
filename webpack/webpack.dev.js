const webpack = require("webpack");

module.exports = {
  mode: "development",
  devtool: "cheap-module-source-map",
  devServer: {
    hot: true,
    open: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.name": JSON.stringify("Nhat Vu"),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
