import antfu from '@antfu/eslint-config'
import svelteStylistic from './dist/index.mjs'
import { svelte } from './svelte-eslint.js'

const newRules = {
  files: ['demo/*.svelte'],
  plugins: {
    'svelte-stylistic': svelteStylistic,
  },
  rules: {
    'svelte-stylistic/svelte-jacob-rule': 'error',
    'svelte-stylistic/svelte-brackets-rule': 'error',
  },
}

export default antfu(
  {},
  {
    ignores: ['vendor'],
  },
  newRules,
  svelte,
)
