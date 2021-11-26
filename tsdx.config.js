const postcss = require('rollup-plugin-postcss');
const autoprefixer = require('autoprefixer');
const tailwindcss = require('tailwindcss');

module.exports = {
  rollup(config, options) {
    config.plugins.push(
      postcss({
        plugins: [tailwindcss(), autoprefixer()],
        use: [['less', { javascriptEnabled: true }]],
        extensions: ['.css', '.less'],
        minimize: true,
        inject: {
          insertAt: 'top',
        },
        // extract: true,
      })
    );
    return config;
  },
};
