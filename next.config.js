/** This file runs under node and hence shouldn't contain
 * any `processable` syntax
 */
const withCSS = require('@zeit/next-css');
const withImages = require('next-images');

module.exports = withCSS(
  withImages({
    inlineImageLimit: 300000,
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
);
