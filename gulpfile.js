var gulp = require('gulp');
var jshint = require('gulp-jshint');
var gutil = require('gulp-util');
var babel = require('gulp-babel');
var defineModule = require('gulp-define-module');

var JS_PATH = 'lib/*.js';

//Execute  JSHINT on JS
gulp.task('lint', function () {
  return gulp.src(JS_PATH)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

//Build function
gulp.task('develop-script', function () {
  return gulp.src(JS_PATH)
    .pipe(babel())
    .pipe(defineModule('hybrid'))
    .pipe(gulp.dest('dist'));
});


//Local development task. Runs through concat, jshint
gulp.task('default', ['lint', 'develop-script'], function () {
  // place code for your default task here
  gulp.watch(JS_PATH, ['lint', 'develop-script']);
  // gulp.watch(TEST_JS_PATH, ['develop-test']);
});
