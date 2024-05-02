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
      'react-refresh/only-export-components': 'off',
    },
  },
)
