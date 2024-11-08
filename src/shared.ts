import type { Node } from 'postcss-value-parser'

export function closeCSSFunctionBracket(node: Node): void {
  (node as Node).type = 'word'
}
