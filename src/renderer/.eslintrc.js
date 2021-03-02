module.exports = {
  env: {
    browser: true,
    node: false,
  },
  plugins: [
    'svelte3',
    '@typescript-eslint' // add the TypeScript plugin
  ],
  overrides: [
    {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3'
    }
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 12,
    sourceType: 'module',
  },
  settings: {
    'svelte3/typescript': require('typescript'), // pass the TypeScript package to the Svelte plugin
    // ...
  }
};
