
var gulp = require('gulp'),
  _ = require('lodash'),
  { updateRegistry, paths } = require('./gulp/common.js'),
  browserSync = require('browser-sync'),
  middleware = require('./gulp/proxy'),
  defaultAssets = require('./config/assets/default'),
  gulpLoadPlugins = require('gulp-load-plugins'),
  plugins = gulpLoadPlugins({
    rename: {
      'gulp-angular-templatecache': 'templateCache'
    }
  });

updateRegistry(gulp);

// Nodemon task
gulp.task('nodemon', function () {
  return plugins.nodemon({
    script: 'server.js',
    nodeArgs: ['--inspect'],
    args: ['--max-old-space-size=8192'],
    ext: 'js,html',
    verbose: true,
    watch: _.union(defaultAssets.server.views, defaultAssets.server.allJS, defaultAssets.server.config)
  });
});
