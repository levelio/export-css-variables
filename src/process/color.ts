import type { Node } from 'postcss-value-parser'
import type { Context } from '../context'
import valueParser from 'postcss-value-parser'
import { closeCSSFunctionBracket } from '../shared'

let variableCounter = 1

export const colorVariableMap: Map<string, { name: string, value: string, path: string }> = new Map()

export function colorProcessor(node: Node, context: Context): boolean {
  if (node.type === 'function' && (node.value === 'rgb' || node.value === 'rgba' || node.value === 'hsl' || node.value === 'hsla')) {
    const colorContent = valueParser.stringify(node)
    const variable = colorVariableMap.get(colorContent)
    if (variable) {
      node.value = `var(${variable.name})`
    }
    else {
      const newName = getVariableName()
      colorVariableMap.set(colorContent, { name: newName, value: colorContent, path: context.file.path })
      node.value = `var(${newName})`
    }

    closeCSSFunctionBracket(node)

    return true
  }

  if (node.type === 'word' && isColor(node.value)) {
    const variable = colorVariableMap.get(node.value)
    if (variable) {
      node.value = `var(${variable.name})`
    }
    else {
      const newName = getVariableName()
      colorVariableMap.set(node.value, { name: newName, value: node.value, path: context.file.path })
      node.value = `var(${newName})`
    }
    return true
  }

  return false
}

function getVariableName(): string {
  return `--color-${variableCounter++}`
}

function isColor(value: string): boolean {
  // 定义常见颜色名称的集合
  const colorNames = new Set([
    'white',
    'yellow',
    'blue',
    'green',
    'red',
    'black',
    'orange',
    'purple',
    'pink',
    'gray',
    'brown',
    'cyan',
    'magenta',
    'lime',
    'navy',
    'teal',
    'olive',
    'silver',
    'maroon',
    'aqua',
    'fuchsia',
  ])
  const hexColorRegex = /^#[a-f0-9]{3}|[a-f0-9]{6,8}$/i
  return hexColorRegex.test(value) || colorNames.has(value.toLowerCase())
}
