import globals from 'globals'
import pluginJs from '@eslint/js'
import pluginReact from 'eslint-plugin-react'
import pluginStylistic from '@stylistic/eslint-plugin-js' // ¡Nombre correcto!

export default [
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: {
      globals: globals.node,
    },
    plugins: {
      js: pluginJs,
      react: pluginReact,
      stylistic: pluginStylistic, // Se llama correctamente
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...pluginReact.configs.recommended.rules,
      'stylistic/indent': ['error', 2],
      'stylistic/linebreak-style': ['error', 'unix'],
      'stylistic/quotes': ['error', 'single'],
      'stylistic/semi': ['error', 'never'],
    },
  },
]
