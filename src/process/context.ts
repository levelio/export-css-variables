export interface Context {
  file: FileInfo
}

export interface FileInfo {
  path: string
  fileName: string
  ext: string
}
