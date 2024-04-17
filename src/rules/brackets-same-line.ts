import type { AST } from 'svelte-eslint-parser';
import { createEslintRule } from '../utils';

export const RULE_NAME = 'brackets-same-line';
export type MessageIds = 'bracketOnSameLine';
export type Options = [];

export default createEslintRule<Options, MessageIds>({
  name: RULE_NAME,
  meta: {
    type: 'layout',
    docs: {
      description: 'Keep closing brackets on the same line as the last attribute or the tag itself',
      recommended: 'stylistic',
    },
    schema: [],
    messages: {
      bracketOnSameLine: 'Closing bracket should be on the same line as the last attribute or the tag itself',
    },
    fixable: 'whitespace',
  },
  defaultOptions: [],
  create: (context) => {
    return {
      SvelteElement(node: AST.SvelteElement) {
        const startLine = node.loc.start.line;
        const lastAttr = node.startTag.attributes[node.startTag.attributes.length - 1];
        const lastAttrLine = lastAttr?.loc.end.line ?? -1;
        const lastLine = Math.max(startLine, lastAttrLine);
        const endOfStartTag = node.startTag.loc.end.line;
        const bracketIsOnSameLine = lastLine === endOfStartTag;
        
        if (!bracketIsOnSameLine) {
          context.report({
            // @ts-expect-error - type conversion from SvelteAttribute to node not handled
            node: lastAttr || node.startTag,
            loc: {
              start: lastAttr?.loc.end || node.startTag.loc.start,
              end: node.startTag.loc.end,
            },
            messageId: 'bracketOnSameLine',
            *fix(fixer) {
              const from = lastAttr?.range[1] ?? node.startTag.range[0];
              const to = node.startTag.range[1];
              const code = context.getSourceCode().text.slice(from, to);
              yield fixer.replaceTextRange([from, to], code.replace(/\s+/g, ''));
            },
          });
        }

        if (!node.endTag) return;

        const endBracketIsOnSameLine = node.endTag.loc.start.line === node.endTag.loc.end.line;
        if (!endBracketIsOnSameLine) {
          context.report({
            // @ts-expect-error - type conversion from SvelteAttribute to node not handled
            node: node.endTag,
            loc: {
              start: node.endTag.loc.start,
              end: node.endTag.loc.end,
            },
            messageId: 'bracketOnSameLine',
            *fix(fixer) {
              const from = node.endTag!.range[0];
              const to = node.endTag!.range[1];
              const code = context.getSourceCode().text.slice(from, to);
              yield fixer.replaceTextRange([from, to], code.replace(/\s+/g, ''));
            },
          });
        }
      },
    };
  },
});
