/** This file runs under node and hence shouldn't contain
 * any `processable` syntax
 */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});
const withCSS = require('@zeit/next-css');
const withImages = require('next-images');

module.exports = withBundleAnalyzer(
  withCSS(
    withImages({
      inlineImageLimit: 50000,
      webpack(config, { isServer }) {
        // Important: return the modified config

        // https://github.com/jsoma/tabletop/issues/158
        if (!isServer) {
          // eslint-disable-next-line no-param-reassign
          config.externals = ['tls', 'net', 'fs'];
        }
        return config;
      }
    })
  )
);
