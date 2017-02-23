import buble from 'rollup-plugin-buble'
import uglify from 'rollup-plugin-uglify'

export default {
  entry: 'src/lines.js',
  dest: 'build/lines.js',
  format: 'iife',
  moduleName: 'lines',
  plugins: [
    buble(),
    uglify()
  ]
}
