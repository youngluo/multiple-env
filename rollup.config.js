import typescript from '@rollup/plugin-typescript'
import path from 'path'

const src = path.resolve(__dirname, 'src')

export default {
  input: path.resolve(src, 'index.ts'),
  output: {
    dir: 'dist',
    format: 'cjs'
  },
  plugins: [
    typescript()
  ]
}
