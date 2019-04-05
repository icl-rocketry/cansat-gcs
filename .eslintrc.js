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
    'no-extraneous-dependencies': 'off',
  }
}
