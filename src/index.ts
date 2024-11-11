import type { Context } from './context'
import postcss from 'postcss'
import lessSyntax from 'postcss-less'
import { extractVariablesPlugin } from './plugin'
import { colorVariableMap } from './process/color'
import { urlVariableMap } from './process/url'
import { findCssFiles, overrideFileContent, readCssFile, writeFile } from './shared'

export async function extractVariables(options: {
  directory: string
  output: string
  basePath?: string
  basePathPrefix?: string
  overrideFile?: boolean
  generateFile?: boolean
  processConfig?: Context['processConfig']
}): Promise<string> {
  const { directory, output, basePath, basePathPrefix } = options
  const cssFiles = await findCssFiles(directory)

  const processor = postcss([extractVariablesPlugin({
    directory,
    basePath: basePath || directory,
    basePathPrefix: basePathPrefix || '@',
    processConfig: options.processConfig,
  }) as any])

  for (const filePath of cssFiles) {
    const fileContent = await readCssFile(filePath)
    const result = await processor.process(fileContent, { from: filePath, syntax: lessSyntax })
    if (options.overrideFile) {
      overrideFileContent(filePath, result.css)
    }
  }

  let content = ':root {\n'
  content += `/* Color Variables */\n`
  for (const variable of colorVariableMap.values()) {
    content += `${variable.name}: ${variable.value};\n`
  }

  content += `\n/* URL Variables */\n`
  for (const variable of urlVariableMap.values()) {
    content += `${variable.name}: ${variable.value};\n`
  }

  content += '}\n'

  if (options.generateFile) {
    writeFile(output, content)
  }

  return content
}
