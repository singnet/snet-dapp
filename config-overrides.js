const webpack = require("webpack");
const { aliasWebpack, configPaths } = require("react-app-alias");

const aliasMap = configPaths("./jsconfig.json");

const options = {
  alias: aliasMap,
};

module.exports = function override(config) {
  const modifiedConfig = aliasWebpack(options)(config);
  const fallback = config.resolve.fallback || {};
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
