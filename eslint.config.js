// noinspection JSCheckFunctionSignatures

import antfu from '@antfu/eslint-config'

export default antfu(
  {
    typescript: true,
    gitignore: true,
    react: true,
    rules: {
      'unicorn/prefer-node-protocol': 'off',
      'style/arrow-parens': ['error', 'always'],
    },
  },
  // {
  //   files: ['**/*.ts', '**/*.tsx'],
  //   plugins: {
  //     '@next/next': nextPlugin,
  //   },
  //   rules: {
  //     // ...nextPlugin.configs.recommended.rules,
  //     // ...nextPlugin.configs['core-web-vitals'].rules,
  //     // '@next/next/no-img-element': 'error',
  //   },
  // },
)
