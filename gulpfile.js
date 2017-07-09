const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();
const pkg = require('./package.json');
const banner = `/*! UNITS v${pkg.version} | MIT License | Copyright 2017 @kokushing | http://unitscss.com */\n\n`;
const processors = [
  require('postcss-import')(),
  require('postcss-nested')(),
  require('postcss-for')(),
  require('postcss-cssnext')({
    features: {
      nesting: false
    },
    browsers: ['last 2 version'],
  })
];


/* Build task */

gulp.task('styles', ['styles:partial'], () => {
  return gulp.src('./src/css/_import.css')
    .pipe($.postcss(processors))
    .pipe($.header(banner))
    .pipe($.rename('units.css'))
    .pipe(gulp.dest('./dist'))
    .pipe(cleanCSS())
    .pipe($.rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('styles:partial', () => {
  return gulp.src(['./src/css/*.css', '!./src/css/_import.css', '!./src/css/variables.css'])
    .pipe($.postcss(processors))
    .pipe($.header(banner))
    .pipe(gulp.dest('./dist/partial'));
});

gulp.task('default', ['styles']);


/* Development task */

gulp.task('dev:serve', ['dev:styles'], () => {
  browserSync.init({
    server: './public',
    notify: false,
    ghostMode: false
  });
  gulp.watch('./src/css/*.css', ['dev:styles']);
  gulp.watch('./public/**/*.html').on('change', browserSync.reload);
});

gulp.task('dev:styles', ['styles'], () => {
  return gulp.src('./src/css/_import.css')
    .pipe($.sourcemaps.init())
    .pipe($.postcss(processors))
    .pipe($.rename('units.css'))
    .pipe($.sourcemaps.write('./maps'))
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.stream());
});

gulp.task('dev', ['dev:serve']);
