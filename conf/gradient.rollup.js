import buble from 'rollup-plugin-buble'
import uglify from 'rollup-plugin-uglify'

export default {
  entry: 'src/gradient.js',
  dest: 'build/gradient.js',
  format: 'iife',
  moduleName: 'Gradient',
  plugins: [
    buble(),
    uglify()
  ]
}
