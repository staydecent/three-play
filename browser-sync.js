const browserSync = require('browser-sync').create()
browserSync.init({
  files: ['build/**/*.html', 'build/**/*.js'],
  server: {
    baseDir: './build/',
    index: 'index.html'
  },
  notify: false
})
