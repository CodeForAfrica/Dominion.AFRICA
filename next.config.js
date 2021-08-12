/** This file runs under node and hence shouldn't contain
 * any `processable` syntax
 */
const withImages = require('next-images');

module.exports = withImages({
  cssLoaderOptions: {
    url: false
  },
  webpack(config, { isServer }) {
    // Important: return the modified config

    // https://github.com/jsoma/tabletop/issues/158
    if (!isServer) {
      // eslint-disable-next-line no-param-reassign
      config.node = { ...config.node, tls: 'empty', net: 'empty', fs: 'empty' };
    }

    return config;
  }
});
