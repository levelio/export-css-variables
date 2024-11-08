import type { Declaration } from 'postcss'
import { processValue } from './process'

export function extractVariablesPlugin(options: { directory: string, basePath: string, basePathPrefix: string }): unknown {
  function plugin(): unknown {
    return {
      postcssPlugin: 'extract-variables',
      Declaration(decl: Declaration) {
        decl.value = processValue(decl.value, {
          file: {
            path: decl.source?.input.file || '',
            start: decl.source?.start,
            end: decl.source?.end,
          },
          directory: options.directory,
          basePath: options.basePath,
          basePathPrefix: options.basePathPrefix,
        })
      },
    }
  }
  plugin.postcss = true
  return plugin
}
