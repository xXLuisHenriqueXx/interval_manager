const path = require("path");

module.exports = {
  entry: "./src/index.ts", // Entry file
  output: {
    filename: "bundle.js", // Output filename
    path: path.resolve(__dirname, "dist"), // Output directory
  },
  resolve: {
    extensions: [".ts", ".js"], // Resolve TypeScript and JavaScript files
  },
  module: {
    rules: [
      {
        test: /\.ts$/, // Apply loader to TypeScript files
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  mode: "development", // Set mode to development or production
};