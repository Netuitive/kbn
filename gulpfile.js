var gulp = require('gulp');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');
var defineModule = require('gulp-define-module');

gulp.task('default', function(){
  return gulp.src('lib/kbn.js', {read: false})
    .pipe(defineModule('hybrid'))
    .pipe(gulp.dest('build/'));
});

gulp.task('mocha', function() {
    return gulp.src(['lib/kbn.js', 'test/test-mocha.js'], { read: false })
        .pipe(mocha({ reporter: 'list' }))
        .on('error', gutil.log);
});

gulp.task('watch-mocha', function() {
    gulp.watch(['lib/**', 'test/**'], ['mocha']);
});
