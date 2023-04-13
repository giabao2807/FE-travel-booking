// eslint-disable-next-line no-undef
module.exports = {
  root: true,
  plugins: [
    '@typescript-eslint'
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/essential',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/base',
    'plugin:vue/strongly-recommended',
    '@vue/typescript',
    '@vue/typescript/recommended',
    '@vue/eslint-config-typescript/recommended'
  ],
  rules: {
    semi: ['error', 'never'],
    quotes: ['error', 'single'],
    'comma-dangle': ['error', 'never'],
    'keyword-spacing': 2,
    'no-multi-spaces': 2,
    'comma-spacing': 2,
    'block-spacing': 2,
    'space-infix-ops': 2,
    'indent': ['error', 2],
    'no-trailing-spaces': 2,
    'object-curly-spacing': ['error', 'always'],
    'space-in-parens': ['error', 'never'],
    'vue/comma-spacing': 2,
    'vue/space-in-parens': ['error', 'never'],
    'vue/block-spacing': 2,
    'vue/no-static-inline-styles': 1,
    'vue/object-curly-spacing': ['error', 'always'],
    'vue/html-indent': ['error', 2],
    'vue/script-indent': ['error', 2],
    'vue/no-multi-spaces': 2,
    'space-before-function-paren': ['error', 'never'],
    'vue/attribute-hyphenation': 0,
    'vue/multi-word-component-names': 0,
    'vue/singleline-html-element-content-newline': 0,
    'vue/no-spaces-around-equal-signs-in-attribute': 0,
    'vue/script-setup-uses-vars': 2,
    'vue/mustache-interpolation-spacing': ['error', 'always'],
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/ban-types': 0,
    'vue/max-attributes-per-line': ['warn', {
      'singleline': {
        'max': 5
      },
      'multiline': {
        'max': 5
      }
    }]
  }
}
