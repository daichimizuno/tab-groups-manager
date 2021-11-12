const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const srcDir = path.join(__dirname, "..", "src");

module.exports = {
  entry: {
    storage_key: path.join(srcDir, "storage_keys.ts"),
    popup: path.join(srcDir, "components/popup.tsx"),
    options: path.join(srcDir, "components/options_root.tsx"),
    option_page: path.join(srcDir, "components/option_page.tsx"),
    background: path.join(srcDir, "background.ts"),
    storage: path.join(srcDir, "chrome_storage_access.ts"),
    content_script: path.join(srcDir, "content_script.tsx"),
    validations: path.join(srcDir,"utils/validations.ts")
  },
  output: {
    path: path.join(__dirname, "../dist/js"),
    filename: "[name].js",
  },
  optimization: {
    splitChunks: {
      name: "vendor",
      chunks(chunk) {
        return chunk.name !== "background" || chunk.name !== "storage";
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: ".", to: "../", context: "public" }],
      options: {},
    }),
  ],
};
