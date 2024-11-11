# export-css-variables

[![npm version][npm-version-src]][npm-version-href]

English | [中文](./README.zh-CN.md)

`export-css-variables` is a tool designed to export CSS variables to a CSS file. It aims to simplify the process of extracting CSS variables in existing legacy projects and provides a simple CLI and API interface.

## Installation

You can install the tool globally via npm or other package managers:

```bash
npm i -g @levelii/export-css-variables
yarn global add @levelii/export-css-variables
pnpm add -g @levelii/export-css-variables
bun add -g @levelii/export-css-variables
```

## CLI Usage

Once installed, you can use the command line tool `ecv` to export CSS variables. Here are some commonly used commands:

### Export CSS Variables

```bash
# global installation
ecv -d <path/to/search/css/files> -o <path/to/export/css/file>

# or use npx
npx @levelii/export-css-variables ecv
```

- -d : `directory` The path to search for CSS files; all CSS files in this path will be searched and exported for CSS variables.
- -o : `output` Specifies the path of the output file where the exported CSS variables will be saved.
- -b : `basePath` If there are relative path references in the CSS, this parameter will be treated as the base URL for conversion, and the default value is the `directory` parameter.
- -p : `basePathPrefix` The prefix for the base path, which defaults to `@`.

The basePath and basePathPrefix parameters can be used to solve issues with relative path references in the CSS. Conversion example:

> If the CSS file is located at `apps/src/pages/component/bar.css`, and there is a reference like `url('../../../images/logo.png')` in the CSS, if the basePath is `apps/src`, the extracted variable value will be `url('@/pages/images/logo.png')`, where `@` is the basePathPrefix parameter.

## API Usage

The tool also provides an API interface that you can use as follows:

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
