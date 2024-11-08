import { defineBuildConfig } from 'unbuild'

// https://github.com/unjs/unbuild/blob/main/src/types.ts
export default defineBuildConfig({
  entries: [
    'src/index',
    { input: 'src/commands/ecv', name: 'ecv' },
  ],
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: true,
    inlineDependencies: true,
    commonjs: {
      exclude: ['**/*.d.ts'],
    },
  },
})
