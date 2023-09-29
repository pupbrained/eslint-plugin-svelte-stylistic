// @ts-check

// @ts-expect-error
import typescriptParser from '@typescript-eslint/parser'
import sveltePlugin from 'eslint-plugin-svelte'
import svelteParser from 'svelte-eslint-parser'
import { defineFlatConfig } from 'eslint-define-config'

export const svelte = defineFlatConfig({
  // @ts-ignore
  files: ['**/*.svelte', '**/*.svx'],
  plugins: {
    svelte: sveltePlugin,
  },
  languageOptions: {
    parser: svelteParser,
    parserOptions: {
      parser: typescriptParser,
    },
  },
  rules: {
    // https://sveltejs.github.io/eslint-plugin-svelte/rules/
    ...sveltePlugin.configs.base.overrides[0].rules,
    ...sveltePlugin.configs.recommended?.rules,
  },
})
