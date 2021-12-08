const postcss = require('rollup-plugin-postcss');

module.exports = {
  rollup(config, options) {
    config.plugins.push(
      postcss({
        config: { path: 'postcss.config.js' },
        minimize: true,
        inject: {
          insertAt: 'top',
        },
        extract: 'style.min.css',
      })
    );
    return config;
  },
};
