const withCSS = require('@zeit/next-css');
const withImages = require('next-images');

module.exports = withCSS(
  withImages({
    webpack(config, { buildId, dev, isServer, defaultLoaders, webpack }) {
      // Note: we provide webpack above so you should not `require` it
      // Perform customizations to webpack config
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
