var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
    watch = require('gulp-watch');
 
//compile + minify style.less
gulp.task('less', function () {
    return gulp.src('./src/assets/style.less')
      .pipe(less({
        paths: [ path.join(__dirname, 'less', 'includes') ]
      }))
      .pipe(gulp.dest('./src/assets/'));
  });

  gulp.task('watchless', function () {
    return watch('./src/assets/*.less', function () {
        gulp.src('./src/assets/style.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest('./src/assets/'));
        });
    });
  
gulp.task('default', function() {
  // place code for your default task here
});