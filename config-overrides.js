const webpack = require("webpack");
const path = require("path");
const { aliasWebpack, configPaths } = require("react-app-alias");

const aliasMap = configPaths("./jsconfig.json");
const { mixinCommonFonts } = require("./node_modules/sandbox-common/webpackUtils/mixinCommonFonts");

const options = {
  alias: {
    ...aliasMap,
    "@": path.resolve(__dirname, "src"),
    "@commonComponents": path.resolve(__dirname, "src/assets/thirdPartyServices/common/"),
    "@standardComponents": path.resolve(__dirname, "src/assets/thirdPartyServices/standardComponents/"),
    "@integratedComponents": path.resolve(__dirname, "src/components/common/"),
    "@assets": path.resolve(__dirname, "src/assets"),
    "@common": path.resolve(__dirname, "src/components/common"),
    "@components": path.resolve(__dirname, "src/components"),
    "@config": path.resolve(__dirname, "src/config"),
    "@utility": path.resolve(__dirname, "src/utility"),
    "@redux": path.resolve(__dirname, "src/Redux"),
  },
};

module.exports = function override(config) {
  mixinCommonFonts(config, path.resolve(__dirname, "./node_modules/sandbox-common/templates/common-fonts.html"));

  const modifiedConfig = aliasWebpack(options)(config);
  let fallback = config.resolve.fallback || {};
  fallback = { ...fallback, fs: false };
  Object.assign(fallback, {
    os: require.resolve("os-browserify"),
    url: require.resolve("url"),
    path: require.resolve("path-browserify"),
  });
  config.resolve.fallback = fallback;
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  ]);
  config.ignoreWarnings = [/Failed to parse source map/];
  config.module.rules.push({
    test: /\.(js|mjs|jsx)$/,
    enforce: "pre",
    loader: require.resolve("source-map-loader"),
    resolve: {
      fullySpecified: false,
    },
  });
  return modifiedConfig;
};
