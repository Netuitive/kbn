var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  jshint = require('gulp-jshint'),
  wrap = require('gulp-wrap'),
  defineModule = require('gulp-define-module'),
  mocha = require('gulp-mocha'),
  babel = require('gulp-babel');

var JS_PATH = 'lib/*.js';
var TEST_JS_PATH = 'test/*.js';

//Execute  JSHINT on JS
gulp.task('lint', function() {
  return gulp.src(JS_PATH)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Concatenate & Minify JS
gulp.task('production-script', function() {
  return gulp.src(JS_PATH)
    .pipe(babel())
    .pipe(uglify())
    .pipe(defineModule('plain'))
    .pipe(rename('kbn.min.js'))
    .pipe(gulp.dest('dist'));
});

//Concatenate JS
gulp.task('develop-script', function() {
  return gulp.src(JS_PATH)
    .pipe(babel())
    .pipe(defineModule('plain'))
    .pipe(gulp.dest('dist'));
});

//Testing task to use netuitive-api.js
gulp.task('develop-test', ['lint', 'develop-script'], function() {
  return gulp.src([TEST_JS_PATH], { read: false })
    .pipe(mocha({
      reporter: 'spec'
    }));
});

//Testing task to use netuitive-api.min.js
gulp.task('production-test', ['lint', 'production-script'], function() {
  return gulp.src([TEST_JS_PATH], { read: false })
    .pipe(mocha({
      reporter: 'spec'
    }));
});

//Local development task. Runs through concat, jshint
gulp.task('default', ['develop-test'], function() {
  // place code for your default task here
  gulp.watch(JS_PATH, ['lint', 'develop-script']);
  gulp.watch(TEST_JS_PATH, ['develop-test']);
});

//Production build task. Runs through concat, jshint
gulp.task('production', ['production-test']);
