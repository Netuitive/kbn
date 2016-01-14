var gulp = require('gulp');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');
var defineModule = require('gulp-define-module');

gulp.task('default', function(){
  return gulp.src('lib/kbn.js', {read: false})
    .pipe(defineModule('hybrid'))
    .pipe(gulp.dest('build/'));
});
