import { defineBuildConfig } from 'unbuild'

// https://github.com/unjs/unbuild/blob/main/src/types.ts
export default defineBuildConfig({
  entries: [
    'src/index',
  ],
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: true,
  },
})
