import { resolve } from 'node:path'
import process, { on } from 'node:process'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { extractVariables } from '../index'

const parser = yargs(hideBin(process.argv)).option({
  directory: {
    alias: 'd',
    describe: 'The directory to search for css files',
    type: 'string',
    demandOption: true,
  },
  output: {
    alias: 'o',
    describe: 'The path to output the variable file',
    type: 'string',
  },
  basePath: {
    alias: 'b',
    describe: 'When set, the relative path in the output variable file will be based on this path',
    type: 'string',
  },
  basePathPrefix: {
    alias: 'p',
    describe: 'When basePath is set, the prefix of the relative path in the output variable file',
    type: 'string',
  },
  onlyRemote: {
    alias: 'r',
    describe: 'When set, only remote urls will be processed',
    type: 'boolean',
  },
}).help();

(async () => {
  const { directory, output, basePath, basePathPrefix, onlyRemote } = await parser.parse()

  await extractVariables({
    directory: resolve(process.cwd(), directory),
    output: output || `${directory}/variables.css`,
    basePath,
    basePathPrefix,
    overrideFile: true,
    generateFile: true,
    processConfig: {
      url: {
        remote: onlyRemote,
      },
    },
  })
})()
