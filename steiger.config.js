import { defineConfig } from 'steiger';
import fsd from '@feature-sliced/steiger-plugin';

export default defineConfig([
  ...fsd.configs.recommended,
  {
    rules: {
      'fsd/public-api': 'off',
    },
  },
  // TODO: Remove this rule when connection to the backend is implemented
  {
    files: ['src/shared/__mock__/**'],
    rules: { 'fsd/forbidden-imports': 'off' },
  },
  {
    files: ['src/widgets/**'],
    rules: {
      'fsd/no-cross-imports': 'off',
      'fsd/forbidden-imports': 'off',
      'fsd/insignificant-slice': 'off',
    },
  },
  // TODO: Remove this rule when we have more entities and requests with data
  {
    files: ['src/entities/quiz/**'],
    rules: {
      'fsd/insignificant-slice': 'off',
    },
  },
]);
