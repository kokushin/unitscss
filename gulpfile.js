const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const cssnext = require('postcss-cssnext');
const processors = [
  cssnext({browsers: ['last 2 version']})
];
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();
const pkg = require('./package.json');
const pkgImporter = require('node-sass-package-importer');
const comment = `/**
 * UNITS v${pkg.version}
 *
 * MIT License
 * https://kokushin.github.io/units/
 * Copyright 2017 @kokushing
*/\r\n\n`;


gulp.task('build', () => {
  return gulp.src('./src/scss/units.scss')
    .pipe($.sass({
      outputStyle: 'expanded',
      importer: pkgImporter({
        extensions: ['.scss', '.css']
      })
    }).on('error', $.sass.logError))
    .pipe($.postcss(processors))
    .pipe($.header(comment))
    .pipe(gulp.dest('./dist'))
    .pipe($.rename({
      extname: '.min.css'
    }))
    .pipe(cleanCSS())
    .pipe($.header(comment))
    .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['build']);


gulp.task('dev:serve', ['dev:build'], () => {
  browserSync.init({
    server: './docs',
    notify: false,
    ghostMode: false
  });

  gulp.watch('./src/**/*.scss', ['dev:build']);
  gulp.watch('./docs/**/*.html').on('change', browserSync.reload);
});

gulp.task('dev:build', ['build'], () => {
  return gulp.src('./src/scss/units.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      importer: pkgImporter({
        extensions: ['.scss', '.css']
      })
    }).on('error', $.sass.logError))
    .pipe($.postcss(processors))
    .pipe($.sourcemaps.write('./maps'))
    .pipe(gulp.dest('./docs/css'))
    .pipe(browserSync.stream());
});

gulp.task('dev', ['dev:serve']);
