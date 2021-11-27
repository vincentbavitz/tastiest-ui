module.exports = {
  plugins: [
    require('postcss-partial-import')({
      root: '.',
      extension: '.less',
    }),
    require('postcss-import'),
    require('postcss-url'),
    require('tailwindcss'),
    require('autoprefixer'),
  ],
};
