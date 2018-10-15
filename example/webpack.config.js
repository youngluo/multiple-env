const { MultipleEnvPlugin } = require('../dist')
const path = require('path')

const root = path.resolve(__dirname)

module.exports = {
  devtool: 'nosources-source-map',
  entry: './index.js',
  output: { path: path.resolve(root, 'dist'), filename: 'index.js' },
  plugins: [new MultipleEnvPlugin()],
}
