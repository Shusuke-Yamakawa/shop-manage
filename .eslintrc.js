module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'react-hooks', 'prettier'],
  rules: {
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'react/jsx-filename-extension': 'off',
    'no-use-before-define': 'off',
    'import/prefer-default-export': 'off',
    'react-hooks/rules-of-hooks': 'error',
  },
};
