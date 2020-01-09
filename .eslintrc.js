module.exports = {
  'env': {
    'es6': true,
    'node': true,
    'browser': true
  },
  'extends': [
    'plugin:react/recommended',
    'standard',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint'
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 2019,
    'sourceType': 'module'
  },
  'plugins': [
    'react',
    '@typescript-eslint',
    'simple-import-sort'
  ],
  'rules': {
    'camelcase': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error', {
        'argsIgnorePattern': '^_'
      }
    ],
    'simple-import-sort/sort': 'error'
  },
  'settings': {
    'react': {
      'version': 'detect'
    }
  }
}
