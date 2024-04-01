const path = require("path");

module.exports = {
  entry: "./src/ath-simulator.ts",
  output: {
    filename: "ath-simulator.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
};
