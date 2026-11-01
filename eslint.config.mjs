import eslint from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginPrettier,
  {
    ignores: [
      '**/dist/**',
      '**/build/**',
      '**/out/**',
      '**/coverage/**',
      '**/node_modules/**',
      // exFAT AppleDouble sidecars are binary junk, not source
      '**/._*',
    ],
  },
  {
    // The landing page is plain browser JS
    files: ['landing/**/*.js'],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
);
