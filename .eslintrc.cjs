/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    '@remix-run/eslint-config',
    '@remix-run/eslint-config/node',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
  rules: {
    '@typescript-eslint/consistent-type-imports': 'off',
    'jsx-a11y/anchor-has-content': 0,
    'no-unused-vars': 0
  }
};
