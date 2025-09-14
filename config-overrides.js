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

  // Add raw-loader rules directly to the beginning of rules array
  config.module.rules.unshift(
    {
      test: /\.sol$/i,
      use: 'raw-loader',
      exclude: /node_modules/
    },
    {
      test: /\.md$/i,
      use: 'raw-loader',
      exclude: /node_modules/
    }
  );

  // Then modify existing rules to exclude .sol and .md files
  config.module.rules = config.module.rules.map(rule => {
    if (rule.oneOf) {
      rule.oneOf.forEach(subRule => {
        // Exclude from asset processing
        if (subRule.type === 'asset/resource' || subRule.type === 'asset') {
          if (!subRule.exclude) {
            subRule.exclude = [];
          }
          if (Array.isArray(subRule.exclude)) {
            subRule.exclude.push(/\.sol$/i, /\.md$/i);
          } else {
            subRule.exclude = [subRule.exclude, /\.sol$/i, /\.md$/i].filter(Boolean);
          }
        }
        // Exclude from file-loader
        if (subRule.loader && (subRule.loader.includes('file-loader') || subRule.loader.includes('url-loader'))) {
          if (!subRule.exclude) {
            subRule.exclude = [];
          }
          if (Array.isArray(subRule.exclude)) {
            subRule.exclude.push(/\.sol$/i, /\.md$/i);
          } else {
            subRule.exclude = [subRule.exclude, /\.sol$/i, /\.md$/i].filter(Boolean);
          }
        }
      });
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