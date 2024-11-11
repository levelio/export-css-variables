# export-css-variables

[![npm version][npm-version-src]][npm-version-href]

[English](./README.md) | 中文

`export-css-variables` 是一个用于将 CSS 变量导出到 CSS 文件的工具。它旨在简化在现存旧项目中提取 CSS 变量的过程，并提供一个简单的 CLI 和 API 接口。

## 安装

你可以通过 npm 或其他包管理器全局安装该工具：

```bash
npm i -g @levelii/export-css-variables
yarn global add @levelii/export-css-variables
pnpm add -g @levelii/export-css-variables
bun add -g @levelii/export-css-variables
```

## CLI 使用

安装完成后，你可以使用命令行工具 ecv 来导出 CSS 变量。以下是一些常用命令：

### 导出 CSS 变量

```bash
# global installation
npx ecv -d <搜索css文件路径> -o <导出css文件路径>

# or use npx
npx @levelii/export-css-variables ecv

```

- -d : `directory` 搜索 css 文件路径，该路径下所有 css 文件将被搜索并导出 CSS 变量。
- -o : `output` 指定输出文件的路径，将导出的 CSS 变量保存到该文件中。
- -b : `basePath` 如果css中存在相对路径引用，该参数会作为 baseurl 进行转换，默认值是 `directory` 参数。
- -p : `basePathPrefix` basepath 的前缀，默认是 `@`。
- -r : `onlyRemote` 如果css文件中存在本地引用，该参数会忽略本地引用，只导出远程引用的变量。

basePath 和 basePathPrefix 参数可以用于解决 css 中存在相对路径引用的问题。转换例子：

> css文件所在目录是 `apps/src/pages/component/bar.css`, 在 css 中存在这样一个引用 `url('../../../images/logo.png')`, 如果 basePath 是 `apps/src` 则提取到的变量值为 `url('@/pages/images/logo.png')`, 其中的 `@` 即 basePathPrefix 参数。

## API 使用

该工具同时提供了 API 接口，你可以通过以下方式使用：

```javascript
import { exportCSSVariables } from '@levelii/export-css-variables'

exportCSSVariables({
  directory: 'path/to/search/css/files',
  output: 'path/to/export/css/file',
  basePath: 'path/to/base/url',
  basePathPrefix: '@'
})
```

## License

[MIT](./LICENSE) License © 2024-PRESENT [levelio](https://github.com/levelio)

[npm-version-src]: https://img.shields.io/npm/v/@levelii/export-css-variables?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/@levelii/export-css-variables
