import type { Node } from 'postcss-value-parser'
import type { Context } from './context'
import valueParser from 'postcss-value-parser'
import { closeCSSFunctionBracket } from '../shared'

let variableCounter = 1

export const variableMap: Map<string, { name: string, value: string, path: string }> = new Map()

export function colorProcessor(node: Node, context: Context): void {
  if (node.type === 'function' && (node.value === 'rgb' || node.value === 'rgba' || node.value === 'hsl' || node.value === 'hsla')) {
    const colorContent = valueParser.stringify(node)
    const varName = variableMap.get(colorContent)
    if (varName) {
      // 如果色值已记录，则替换掉原来的色值
      node.value = `var(${varName.name})`
      closeCSSFunctionBracket(node)
    }
    else {
      // 如果色值未记录, 则注册一个新的变量
      const newName = getVariableName()
      variableMap.set(colorContent, { name: newName, value: colorContent, path: context.file.path })
    }
  }

  if (node.type === 'word') {}
}

function getVariableName(): string {
  return `--color-${variableCounter++}`
}

function stringIsColor(string: string) {

}
