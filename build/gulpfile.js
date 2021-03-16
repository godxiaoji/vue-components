const gulp = require('gulp')
const sass = require('gulp-sass')
const replace = require('gulp-replace')
const autoprefixer = require('gulp-autoprefixer')

function sass2css() {
  return gulp
    .src('../src/**/*.scss')
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(gulp.dest('../es'))
}

function copyIndex() {
  return gulp.src('../src/**/style/index.js').pipe(gulp.dest('../es'))
}

function fixDts() {
  return gulp
    .src('../es/**/*.d.ts')
    .pipe(replace('@/', '../'))
    .pipe(gulp.dest('../es'))
}

exports.build = gulp.series(sass2css, copyIndex)
exports.dts = fixDts
