module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    ecmaFeatures: {
      impliedStrict: true,
    },
    sourceType: 'module',
  },
  extends: ['eslint:recommended'],
  ignorePatterns: ['main.js', 'node_modules/'],
  rules: {
    curly: 'error',
    'comma-dangle': 0,
    'no-console': [
      'warn',
      { allow: ['clear', 'info', 'error', 'dir', 'trace'] },
    ],
    'no-unneeded-ternary': 'error',
    'no-useless-return': 'error',
    'no-var': 'error',
    'one-var': ['error', 'never'],
    'prefer-arrow-callback': 'error',
    'symbol-description': 'error',
    strict: 'error',
    indent: ['error', 2, { SwitchCase: 1 }],
    semi: ['error', 'always'],
  },
};
