var gulp = require('gulp');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');

gulp.task('default', function() {
      gulp.watch(['index.js', 'tests/**'], ['mocha']);
});

gulp.task('mocha', function() {
    return gulp.src(['tests/*.js'], { read: false })
        .pipe(mocha({ reporter: 'list' }))
        .on('error', gutil.log);
});
