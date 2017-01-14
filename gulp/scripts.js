'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();


gulp.task('scripts-reload', function() {
  return buildScripts()
    .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
  return buildScripts();
});

function buildScripts() {
  return gulp.src(path.join(conf.paths.src, '/app/**/*.js'))
    // NOTE: uncomment if you want eslint in terminal output for gulp
    // .pipe($.eslint({
	  //   rules: {
	  //       'no-mixed-spaces-and-tabs': 0,
	  //   }
    // }))
    // .pipe($.eslint.format())
    .pipe($.size());
}
