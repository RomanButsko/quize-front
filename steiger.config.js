import { defineConfig } from 'steiger';
import fsd from '@feature-sliced/steiger-plugin';

export default defineConfig([
  ...fsd.configs.recommended,
  {
    rules: {
      'fsd/public-api': 'off',
    },
  },
  {
    files: ['src/shared/__mock__/**'],
    rules: { 'fsd/forbidden-imports': 'off' },
  },
]);
