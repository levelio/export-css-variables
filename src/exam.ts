import postcss from 'postcss'
import valueParser from 'postcss-value-parser'

// 输入 CSS 字符串
const cssString = `
@import url("styles.css");
body {
    background-color: white;
    background-color: #f0f0f000;
    box-shadow: 2px 4px 16px 0 rgba(0, 0, 0, 0.08);
    color: #ff5733;
    background: url('images/bg.png') no-repeat center center/100%;
    box-shadow: 2px 4px 16px 0 rgb(0, 0, 0);
    background: linear-gradient(url('https://path/to/image.jpg'), #fff);
}
    @font-face {
  font-family: nunito;
  src: url('//app/resource/fonts/nunito/Nunito-Medium.ttf') format('opentype');
  font-display: swap;
}
`

// 用于存储提取的变量
const variables: Record<string, string> = {}
let variableCounter = 1

// 处理属性值，提取色值和 URL
function processValue(value: string): string {
  const parsedValue = valueParser(value)

  parsedValue.walk((node) => {
    // 验证颜色值
    if (node.type === 'word' && /^#[0-9A-F]{3,6}$/i.test(node.value)) {
      const varName = `--color${variableCounter++}`
      variables[varName] = node.value // 存储原色值
      node.value = `var(${varName})` // 替换为变量
    }

    // 验证 URL
    else if (node.type === 'function' && node.value === 'url') {
      const urlContent = valueParser.stringify(node)
      const varName = `--url${variableCounter++}`
      variables[varName] = urlContent
      node.value = `var(${varName})`;
      (node as any).type = 'word'
    }

    // 处理 rgba() 和 rgb() 的情况
    else if (node.type === 'function' && (node.value === 'rgba' || node.value === 'rgb')) {
      const rgbaContent = valueParser.stringify(node)
      const varName = `--color${variableCounter++}`
      variables[varName] = rgbaContent
      node.value = `var(${varName})`;
      (node as any).type = 'word'
    }
  })

  return parsedValue.toString()
}

function extractColorsUrlsPlugin(): any {
  return {
    postcssPlugin: 'extract-colors-urls',
    Declaration(decl: any) {
      decl.value = processValue(decl.value)
    },
  }
}
extractColorsUrlsPlugin.postcss = true

// 应用插件处理 CSS
const processor = postcss([extractColorsUrlsPlugin])
processor.process(cssString, { from: undefined }).then((result) => {
  // 生成 CSS 变量声明
  const variableDeclarations = Object.entries(variables)
    .map(([varName, value]) => `  ${varName}: ${value};`)
    .join('\n')

  // 创建最终的 CSS 字符串
  const finalCSS = `:root {\n${variableDeclarations}\n}\n\n${result.css}`
  console.log(finalCSS) // 输出最终的 CSS
})
