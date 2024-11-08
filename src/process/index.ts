import valueParser from 'postcss-value-parser'

export function processValue(value: string, variableHandler: (key: string, value: string) => void): string {
  const parsedValue = valueParser(value)
}
