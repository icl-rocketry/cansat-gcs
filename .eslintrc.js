module.exports = {
  extends: 'airbnb-base',

  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true
  },
  globals: {
    __static: true
  },
  rules: {
    'semi': ['error', 'never'],
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 'off',
    'no-underscore-dangle': ['error', { 'allowAfterThis': true }],
    'no-param-reassign': ["error", { "props": false }],
  },
  settings: {
    'import/resolver': {
      'webpack': { 
        config: '.webpack/renderer.additions.js'
      }
    }
  }
}
