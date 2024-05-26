import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  react: true,
  typescript: true,
  gitignore: true,
}).append({
  rules: {
    'unicorn/prefer-node-protocol': 'off',
    'style/arrow-parens': ['error', 'always'],
    'react-refresh/only-export-components': 'off',
  },
})
