const fs = require('fs')
const gulp = require('gulp')
const sass = require('gulp-sass')
const replace = require('gulp-replace')
const autoprefixer = require('gulp-autoprefixer')
const through = require('through2')

function sass2css() {
  return gulp
    .src('../src/**/*.scss')
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(gulp.dest('../es'))
}

function copyStyle() {
  return gulp
    .src('../src/**/style/index.js')
    .pipe(replace('.scss', '.css'))
    .pipe(gulp.dest('../es'))
}

function fixDts() {
  return gulp
    .src('../es/**/*.d.ts')
    .pipe(replace('@/', '../'))
    .pipe(gulp.dest('../es'))
}

function cacheTsPath() {
  const paths = []

  return gulp
    .src('../src/**/*.ts')
    .pipe(
      through.obj(function(file, enc, callback) {
        this.push(
          `${file.path
            .replace(/\\/g, '/')
            .split('src/')
            .pop()}\n`
        )
        callback()
      })
    )
    .on('data', function(data) {
      paths.push(data)
    })
    .pipe(fs.createWriteStream('ts-files.txt'))
}

exports.build = gulp.series(sass2css, copyStyle)
exports.dts = fixDts
exports.cts = cacheTsPath
