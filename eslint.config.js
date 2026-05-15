const nextCoreWebVitals = require('eslint-config-next/core-web-vitals');
const prettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = [
  {
    ignores: [
      '.next/**',
      'out/**',
      'node_modules/**',
      'dist/**',
      '.sandcastle/**',
      'next-env.d.ts',
    ],
  },
  ...nextCoreWebVitals,
  prettierRecommended,
];
