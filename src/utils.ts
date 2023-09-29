import { ESLintUtils } from '@typescript-eslint/utils'

const hasDocs: string[] = []

export const createEslintRule = ESLintUtils.RuleCreator(
  ruleName => hasDocs.includes(ruleName)
    ? `https://github.com/jacob-8/eslint-plugin-svelte-stylistic/blob/main/src/rules/${ruleName}.md`
    : `https://github.com/jacob-8/eslint-plugin-svelte-stylistic/blob/main/src/rules/${ruleName}.test.ts`,
)
