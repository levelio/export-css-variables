export interface Context {
  file: FileInfo
  directory: string
  basePath: string
  basePathPrefix: string
}

export interface FileInfo {
  path: string
  start?: { line: number, column: number }
  end?: { line: number, column: number }
}
