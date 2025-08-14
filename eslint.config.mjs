import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ['next', 'next/typescript', 'prettier'],
    rules: {},
    ignorePatterns: ['lib/generated/prisma/**'],
    overrides: [
      {
        files: ['**/*.d.ts'],
        rules: {
          'no-unused-vars': 'off',
          '@typescript-eslint/no-unused-vars': 'off',
        },
      },
    ],
  }),
];

export default eslintConfig;
