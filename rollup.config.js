import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import external from 'rollup-plugin-peer-deps-external';
import styles from 'rollup-plugin-styles';
import { terser } from 'rollup-plugin-terser';

const packageJson = require('./package.json');

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    external({ includeDependencies: true }),
    resolve(),
    typescript({ tsconfig: './tsconfig.json' }),
    styles({
      config: { path: './postcss.config.js' },
      extensions: ['.css', '.less'],
      // minimize: process.env.NODE_ENV === 'production',
      mode: 'extract',
      minimize: true,
      inject: {
        insertAt: 'top',
      },
      import: { extensions: ['.css', '.less'] },
      use: ['less'],
      less: {
        javascriptEnabled: true,
      },
      // plugins: [postcssImport(), postcssUrl()],
    }),
    commonjs(),
    terser(),
  ],
};
