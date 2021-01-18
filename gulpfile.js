const gulp = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')

gulp.task('build', function() {
  return gulp
    .src('src/**/*.scss')
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(gulp.dest('src'))
})
