import type { Compiler } from 'webpack'
import { validate } from 'schema-utils'
import get from 'lodash.get'
import yaml from 'js-yaml'
import path from 'path'
import fs from 'fs'

interface Options {
  config?: string
  env: string
}

interface YamlData {
  [key: string]: string
}

const schema = {
  type: 'object',
  properties: {
    config: {
      description: 'Specify the configuration path.',
      type: 'string',
    },
    env: {
      description: 'Specify a key declared in the configuration file for the current environment.',
      type: 'string',
    },
  },
  required: ['env'],
  additionalProperties: false,
}

export class MultipleEnvPlugin {
  name = 'MultipleEnvPlugin'

  options = {} as Options

  constructor(options = {} as Options) {
    // @ts-ignore
    validate(schema, options, {
      name: this.name,
    })

    this.options = Object.assign({ config: path.resolve('env.yml') }, options)
  }

  apply(compiler: Compiler) {
    new compiler.webpack.DefinePlugin(this.getDefineData()).apply(compiler)
  }

  getDefineData() {
    const data = this.getYamlContent()
    const result: YamlData = {}
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        result[`process.env.${key}`] = data[key]
      }
    }

    return result
  }

  getYamlContent(): YamlData {
    try {
      return get(yaml.load(fs.readFileSync(this.options.config!, 'utf8')), this.options.env, {})
    } catch (e) {
      console.error(e)
      process.exit()
    }
  }
}
