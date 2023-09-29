/* eslint-disable ts/quotes */
import { RuleTester } from '../../vendor/rule-tester/src/RuleTester'
import rule, { RULE_NAME } from './brackets-same-line'

const valids: string[] = [
  `<div>Text</div>`,

  `<div title="foo">Text</div>`,

  `<div 
    title="foo">Text</div>`,

  `<div>
   Text
  </div>`,

  `<div />`,
]

// See snapshot for fixed code
const invalids = [
  `<div 
    title="foo"
    >Text</div>`,

  `<div 
    title="foo"
    class="foo"
    >Text</div>`,

  `<div
  >Text</div>`,

  `<div
  >
  Text</div>`,

  `<div>Text</div
  >`,

  `<div 
  />`,
]

const ruleTester: RuleTester = new RuleTester({
  parser: require.resolve('svelte-eslint-parser'),
})

ruleTester.run(RULE_NAME, rule as any, {
  valid: valids,
  invalid: invalids.map(i => ({
    code: i,
    errors: null,
    onOutput: (output: string) => {
      expect(output).toMatchSnapshot()
    },
  })),
})
