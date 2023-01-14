const path = require("path");
const dotenv = require("dotenv");

const {
  DefinePlugin,
  EnvironmentPlugin,
  ProvidePlugin,
  ContextReplacementPlugin,
  NormalModuleReplacementPlugin,
} = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { GitRevisionPlugin } = require("git-revision-webpack-plugin");
const StatoscopeWebpackPlugin = require("@statoscope/webpack-plugin").default;
const appVersion = require("./package.json").version;

const { APP_ENV = "production" } = process.env;

dotenv.config();

const { BASE_URL = "http://localhost:1234" } = process.env;

module.exports = (_env, { mode = "production" }) => {
  return {
    mode,
    entry: "./src/index.tsx",
    target: "web",

    devServer: {
      port: 1111,
      host: "0.0.0.0",
      allowedHosts: "all",
      hot: false,
      static: [
        {
          directory: path.resolve(__dirname, "public"),
        },
      ],
      devMiddleware: {
        stats: "minimal",
      },
    },

    output: {
      filename: "[name].[contenthash].js",
      chunkFilename: "[id].[chunkhash].js",
      assetModuleFilename: "[name].[contenthash][ext]",
      path: path.resolve(__dirname, "dist"),
      clean: true,
    },

    module: {
      rules: [
        {
          test: /\.(ts|tsx|js)$/,
          loader: "babel-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
              },
            },
            "postcss-loader",
          ],
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                modules: {
                  exportLocalsConvention: "camelCase",
                  auto: true,
                  localIdentName:
                    mode === "production" ? "[hash:base64]" : "[name]__[local]",
                },
              },
            },
            "postcss-loader",
            "sass-loader",
          ],
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg|png|jpg|tgs)(\?v=\d+\.\d+\.\d+)?$/,
          type: "asset/resource",
        },
        {
          test: /\.wasm$/,
          type: "asset/resource",
        },
        {
          test: /\.(txt|tl)$/i,
          type: "asset/source",
        },
      ],
    },

    resolve: {
      extensions: [".js", ".ts", ".tsx"],
    },

    plugins: [
      // Clearing of the unused files for code highlight for smaller chunk count
      new ContextReplacementPlugin(
        /highlight\.js\/lib\/languages/,
        /^((?!\.js\.js).)*$/
      ),
      new HtmlWebpackPlugin({
        appName:
          APP_ENV === "production" ? "Refact.JS Web" : "Refact.JS Web Beta",
        appleIcon:
          APP_ENV === "production"
            ? "apple-touch-icon"
            : "apple-touch-icon-dev",
        mainIcon:
          APP_ENV === "production" ? "icon-192x192" : "icon-dev-192x192",
        manifest:
          APP_ENV === "production"
            ? "site.webmanifest"
            : "site_dev.webmanifest",
        baseUrl: BASE_URL,
        template: "src/index.html",
      }),
      new MiniCssExtractPlugin({
        filename: "[name].[contenthash].css",
        chunkFilename: "[name].[chunkhash].css",
        ignoreOrder: true,
      }),
      new EnvironmentPlugin({
        APP_ENV,
        APP_NAME: null,
        APP_VERSION: appVersion,
      }),
      new ProvidePlugin({
        Buffer: ["buffer", "Buffer"],
      }),
      new StatoscopeWebpackPlugin({
        statsOptions: {
          context: __dirname,
        },
        saveReportTo: path.resolve("./public/bundle-report/report.html"),
        saveStatsTo: path.resolve("./public/bundle-report/build-stats.json"),
        normalizeStats: true,
        open: "file",
        extensions: [],
      }),
    ],

    devtool: "source-map",

    ...(APP_ENV !== "production" && {
      optimization: {
        chunkIds: "named",
      },
    }),
  };
};
