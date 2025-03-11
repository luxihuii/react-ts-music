import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}']
  },
  {
    languageOptions: {
      globals: globals.browser
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ...pluginReact.configs.flat.recommended,
    settings: {
      react: {
        version: 'detect' // 自动检测 React 版本
      }
    },
    rules: {
      ...pluginReact.configs.flat.recommended.rules,
      'no-unused-vars': 'warn', // 示例规则，警告未使用的变量
      'no-console': 'error', // 强制禁止使用 console
      'react/react-in-jsx-scope': 'off', // 禁用 React 17+ 需要 `import React`
      '@typescript-eslint/no-explicit-any': 'off'
    },
    env: {
      development: {
        'no-console': 'off'
      },
      production: {
        'no-console': 'warn'
      }
    }
  }
]
