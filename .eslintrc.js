module.exports = {
  parser: '@typescript-eslint/parser', // Specify the ESLint parser for TypeScript
  extends: [
    'eslint:recommended', 
    'plugin:@typescript-eslint/recommended' 
  ],
  parserOptions: {
    ecmaVersion: 2020, 
    sourceType: 'module', 
  },
  rules: {
    // Rules configuration
    '@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
    'object-curly-spacing': ['error', 'always'],
    'prefer-const': 'error'
  },
};