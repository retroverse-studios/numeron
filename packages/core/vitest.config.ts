import { defineConfig, configDefaults } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    // exFAT/AppleDouble junk files (._foo.test.ts) match the default glob
    exclude: [...configDefaults.exclude, '**/._*'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      include: ['src/**/*.ts'],
      exclude: ['src/**/__tests__/**', 'src/**/index.ts'],
    },
  },
});
