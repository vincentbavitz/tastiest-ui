module.exports = {
  // root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020, // Allows for ES8+
    ecmaFeatures: { jsx: true },
    sourceType: 'module',
  },
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',

    // Prettier plugin and recommended rules
    'plugin:prettier/recommended',
  ],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/no-unescaped-entities': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/anchor-has-content': 'off',
    'jsx-a11y/iframe-has-title': 'off',
    'jsx-a11y/no-onchange': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/alt-text': 'off',
    'jsx-a11y/img-redundant-alt': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
