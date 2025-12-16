const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { container } = require("webpack");
const Dotenv = require("dotenv-webpack");

// Load environment variables
require("dotenv").config({ path: `.env.${process.env.NODE_ENV || "development"}` });
require("dotenv").config(); // Load base .env

const isDevelopment = process.env.NODE_ENV !== "production";
const moduleOneUrl = process.env.MODULE_ONE_URL || "http://localhost:3001";
const moduleTwoUrl = process.env.MODULE_TWO_URL || "http://localhost:3002";

module.exports = {
  entry: "./src/index.tsx",
  mode: isDevelopment ? "development" : "production",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    publicPath: process.env.PUBLIC_URL || "/",
    clean: true,
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@shared/types": path.resolve(__dirname, "../shared-types/src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new Dotenv({
      path: `.env.${process.env.NODE_ENV || "development"}`,
      safe: false,
      systemvars: true,
      defaults: ".env",
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      title: "Micro-Frontend Host",
    }),
    new container.ModuleFederationPlugin({
      name: "host",
      remotes: {
        "@modules/module-one": `module_one@${moduleOneUrl}/remoteEntry.js`,
        "@modules/module-two": `module_two@${moduleTwoUrl}/remoteEntry.js`,
      },
      shared: {
        react: { singleton: true, requiredVersion: "^18.2.0", eager: true },
        "react-dom": { singleton: true, requiredVersion: "^18.2.0", eager: true },
        "react-router-dom": { singleton: true, requiredVersion: "^6.20.0", eager: true },
      },
    }),
  ],
  devtool: isDevelopment ? "source-map" : false,
};
