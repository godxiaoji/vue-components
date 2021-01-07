const gulp = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')

gulp.task('build', function() {
  return gulp
    .src('src/components/**/*.scss')
    .pipe(sass())
    .pipe(autoprefixer({ cascade: false }))
    .pipe(gulp.dest('lib'))
})
