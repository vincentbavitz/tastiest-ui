const postcss = require('rollup-plugin-postcss');

module.exports = {
  rollup(config, options) {
    config.plugins.push(
      postcss({
        config: { path: 'postcss.config.js' },
        minimize: true,
        inject: false,
        extract: 'styles.min.css',
      })
    );
    return config;
  },
};
