const webpack = require('webpack');

module.exports = function override(config, env) {
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    "crypto": require.resolve("crypto-browserify"),
    "stream": require.resolve("stream-browserify"),
    "http": require.resolve("stream-http"),
    "https": require.resolve("https-browserify"),
    "zlib": require.resolve("browserify-zlib"),
    "url": require.resolve("url/"),
    "assert": require.resolve("assert/"),
    "buffer": require.resolve("buffer/"),
    "util": require.resolve("util/"),
  });
  config.resolve.fallback = fallback;
  config.plugins = (
    config.plugins || []
  ).concat([
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  ]);
  config.ignoreWarnings = [/Failed to parse source map/];
  config.module.rules = config.module.rules.map(rule => {
    if (rule.oneOf) {
      rule.oneOf.unshift(
        {
          test: /\.sol$/,
          use: 'raw-loader',
        },
        {
          test: /\.md$/,
          use: 'raw-loader',
        }
      );
      // Find and modify the asset/resource rule to exclude .sol and .md
      const assetRule = rule.oneOf.find(subRule => subRule.type === 'asset/resource');
      if (assetRule) {
        if (!assetRule.exclude) {
          assetRule.exclude = [];
        }
        assetRule.exclude.push(/\.sol$/, /\.md$/);
      }
    }
    return rule;
  });
  config.module.rules.push({
    test: /\.m?js/,
    resolve: {
      fullySpecified: false,
    },
  });


  return config;
};