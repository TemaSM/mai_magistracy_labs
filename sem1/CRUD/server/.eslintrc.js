module.exports = {
  root: true,
  env: {
    es6: true,
    es2017: true,
    browser: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'standard',
  ],
  parserOptions: {
    ecmaVersion: 9,
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': 'warn',
    'no-debugger': 'warn',
    'linebreak-style': 0,
    'space-before-function-paren': ['error', {
      anonymous: 'always',
      named: 'never',
      asyncArrow: 'always',
    }],
    camelcase: ['off'],
    'brace-style': [0, '1tbs', { allowSingleLine: true }],
    'comma-dangle': ['error', 'always-multiline'],
    'no-undef': 'warn',
    'no-unused-vars': 'warn',
    'no-var': 'error',
    'no-case-declarations': 'warn',
    'prefer-const': 'error',
    'padded-blocks': 'warn',
    'import/first': 'warn',
    'one-var': 'off',
    'arrow-parens': ['error', 'as-needed'],
    'no-trailing-spaces': ['error', { ignoreComments: true }],
    'prefer-promise-reject-errors': 'error',
    'no-return-await': 'error',
  },
}
// TODO: Use ESNext : https://www.npmjs.com/package/eslint-config-recommended
// TODO: Configure switch-case "fall through" : https://eslint.org/docs/rules/no-fallthrough
// TODO: Recheck rules and add/remove needed
/*
  'no-console': 'off',
  'lines-between-class-members':'off',
  'template-curly-spacing': 'off',
  'no-multi-spaces': 'off',
  'no-const-assign': 'warn',
  'no-this-before-super': 'warn',
  'no-unreachable': 'warn',
  'constructor-super': 'warn',
  'valid-typeof': 'warn',
  'object-property-newline': 'warn',
  'quote-props': 'off'
*/
