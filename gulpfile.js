var gulp = require('gulp'),
    connect = require('gulp-connect');

gulp.task('connect', function() {
    connect.server({
        port: 9997
    });
});
gulp.task('copy', function() {
    return mergeStream(
        gulp.src('data/*.json').pipe(gulp.dest('data/'))
    );
});

gulp.task('watch', function() {
    gulp.watch(['data/*.json'], ['copy']);

    Object.keys(jsBundles).forEach(function(key) {
        var b = jsBundles[key];
        b.on('update', function() {
            return bundle(b, key);
        });
    });
});

gulp.task('default', ['connect']);