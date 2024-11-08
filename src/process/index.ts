import type { Context } from '../context'
import valueParser from 'postcss-value-parser'
import { compose } from '../shared'
import { colorProcessor } from './color'
import { urlProcess } from './url'

export function processValue(value: string, context: Context): string {
  const parsedValue = valueParser(value)
  const process = compose(
    colorProcessor,
    urlProcess,
  )

  parsedValue.walk((node) => {
    process(node, context)
  })

  return parsedValue.toString()
}
