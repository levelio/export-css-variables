import type { Node } from 'postcss-value-parser'
import type { Context } from '../context'
import path from 'node:path'
import valueParser from 'postcss-value-parser'
import { closeCSSFunctionBracket, isRelativePath } from '../shared'

let variableCounter = 1

export const urlVariableMap: Map<string, { name: string, value: string, path: string }> = new Map()

export function urlProcess(node: Node, context: Context): boolean {
  if (node.type === 'function' && node.value === 'url') {
    const urlValue = node.nodes?.[0]?.value
    if (context.processConfig?.url?.remote && !isRemoteUrl(urlValue)) {
      return false
    }

    if (isFontUrl(urlValue)) {
      return false
    }

    if (isBase64DataUrl(urlValue)) {
      return false
    }

    if (isRelativePath(urlValue)) {
      node.nodes[0].value = relativePathToAbsolute(urlValue, context.file.path, context.basePath, context.basePathPrefix)
    }

    const urlContent = valueParser.stringify(node)
    const variable = urlVariableMap.get(urlContent)
    if (variable) {
      node.value = `var(${variable.name})`
    }
    else {
      const variableName = getVariableName()
      urlVariableMap.set(urlContent, { name: variableName, value: urlContent, path: context.file.path })
      node.value = `var(${variableName})`
    }

    closeCSSFunctionBracket(node)

    return true
  }

  return false
}

function getVariableName(): string {
  return `--url-${variableCounter++}`
}

function relativePathToAbsolute(relativePath: string, filePath: string, basePath: string, basePathPrefix: string): string {
  return path.resolve(path.dirname(filePath), relativePath).replace(basePath, basePathPrefix)
}

function isBase64DataUrl(url: string): boolean {
  return url.startsWith('data:')
}

function isRemoteUrl(url: string): boolean {
  return url.startsWith('http://') || url.startsWith('https://') || url.startsWith('//')
}

function isFontUrl(url: string): boolean {
  return url.endsWith('.eot')
    || url.endsWith('.otf')
    || url.endsWith('.svg')
    || url.endsWith('.ttf')
    || url.endsWith('.woff')
    || url.endsWith('.woff2')
}
