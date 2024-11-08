import fg from 'fast-glob'

export function findCssFiles(entry: string): Promise<string[]> {
  return fg('**/*.{css,scss,sass,less}', { onlyFiles: true, absolute: true, dot: true, cwd: entry })
}
