// noinspection NpmUsedModulesInstalled

/*
 * nextPluginFlatConfig see -> https://github.com/vercel/next.js/discussions/49337
 */

import antfu from '@antfu/eslint-config'
import nextPlugin from '@next/eslint-plugin-next'
import reactPlugin from 'eslint-plugin-react'
import hooksPlugin from 'eslint-plugin-react-hooks'
import tailwindPlugin from 'eslint-plugin-tailwindcss'
import liferayPlugin from '@liferay/eslint-plugin'

export default antfu(
  {
    vue: false,
    react: true,
    typescript: true,
    gitignore: true,
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      'react': reactPlugin,
      'react-hooks': hooksPlugin,
      '@next/next': nextPlugin,
      'tailwindcss': tailwindPlugin,
      '@liferay': liferayPlugin,
    },
    rules: {
      ...reactPlugin.configs['jsx-runtime'].rules,
      ...reactPlugin.configs.recommended.rules,
      ...hooksPlugin.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      ...tailwindPlugin.configs.recommended.rules,
      '@next/next/no-img-element': 'error',
      'react-refresh/only-export-components': 'off',
      '@liferay/no-duplicate-class-names': 'warn',
      '@liferay/trim-class-names': 'warn',
    },
  },
  // unocss(),
)
