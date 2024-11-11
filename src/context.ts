export interface Context {
  file: FileInfo
  directory: string
  basePath: string
  basePathPrefix: string
  processConfig?: {
    url?: {
      // only process url with these protocols ( http and https )
      remote?: boolean
    }
  }
}

export interface FileInfo {
  path: string
  start?: { line: number, column: number }
  end?: { line: number, column: number }
}
