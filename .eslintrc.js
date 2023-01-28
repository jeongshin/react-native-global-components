module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:react/recommended',
  ],
  ignorePatterns: ['**/*.js'],
  plugins: ['@typescript-eslint', 'react-hooks', 'prettier', 'import'],
  rules: {
    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external', ['parent', 'sibling'], 'index', 'type'],
        pathGroups: [
          {
            pattern: 'react+(|-native)',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: '@**',
            group: 'external',
            position: 'after',
          },
        ],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        pathGroupsExcludedImportTypes: ['builtin'],
      },
    ],
  },
};
