const gulp = require('gulp')
const less = require('gulp-less')
const concat = require('gulp-concat')
const cleanCSS = require('gulp-clean-css')
const watch = require('gulp-watch')

const paths = {
  less: './src/less/**/*.less',
  css: './dist/css'
}

gulp.task('build-css', function () {
  return gulp.src(paths.less)
    .pipe(less())
    .pipe(concat('styles.min.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest(paths.css))
})

gulp.task('watch', function () {
  gulp.watch(paths.less, gulp.series('build-css'))
})

gulp.task('default', gulp.series('build-css', 'watch'))
