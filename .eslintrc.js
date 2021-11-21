module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
  ],
  plugins: [],
  rules: {
    'prettier/prettier': [
      'error',
      { singleQuote: true, parser: 'flow', semi: true },
    ],
  },
};
