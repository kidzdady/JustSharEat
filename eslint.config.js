// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import nextPlugin from '@next/eslint-plugin-next';
// Import other plugins as needed, e.g., for React, JSX A11y

export default tseslint.config(
  {
    // Global ignores
    ignores: [
      ".next/**",
      "node_modules/**",
      "public/**",
      // Add other specific files or directories to ignore
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  // ...tseslint.configs.stylistic, // Optional: for more stylistic rules
  {
    // Configuration for Next.js specific rules
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      // Add or override Next.js specific rules here
      // e.g., "@next/next/no-html-link-for-pages": "error"
    },
  },
  {
    // General rules for TypeScript/JavaScript files
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      // Add your project-specific rules here
      // Example:
      // 'no-unused-vars': 'warn',
      // 'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    },
    languageOptions: {
      globals: {
        React: 'readonly',
        // Add other global variables if necessary
      },
    },
  }
  // Add other configurations for specific file types or plugins
  // e.g., for testing files, markdown files, etc.
);