import type { Node } from 'postcss-value-parser'
import fg from 'fast-glob'
import fs from 'fs-extra'

export function closeCSSFunctionBracket(node: Node): void {
  (node as Node).type = 'word'
}

export function compose<T extends (...args: any[]) => any>(...args: T[]) {
  return (...args2: Parameters<T>) => {
    for (const fn of args) {
      if (fn(...args2)) {
        return
      }
    }
  }
}

export function overrideFileContent(filePath: string, content: string): Promise<void> {
  return fs.outputFile(filePath, content)
}

export function findCssFiles(entry: string): Promise<string[]> {
  return fg('**/*.{css,scss,sass,less}', { onlyFiles: true, absolute: true, dot: true, cwd: entry })
}

export function readCssFile(filePath: string): Promise<string> {
  return fs.readFile(filePath, 'utf8')
}

export function isRelativePath(url: string): boolean {
  if (!url)
    return false
  return url.startsWith('.')
}

export function writeFile(filePath: string, content: string): Promise<void> {
  return fs.outputFile(filePath, content)
}
