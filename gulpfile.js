const gulp = require('gulp');
const fs = require('fs');
const $ = require('gulp-load-plugins')();
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config');
const pkg = require('./package.json');
const banner = `/*! UNITS v${pkg.version} | MIT License | Copyright 2017 @kokushing | mail@kokush.in | https://unitscss.com */\n`;
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
    .pipe($.plumber())
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
    .pipe($.plumber())
    .pipe($.postcss(processors))
    .pipe($.header(banner))
    .pipe(gulp.dest('./dist/partial'));
});

gulp.task('javascripts', () => {
  return gulp.src('./src/js/_import.js')
    .pipe($.plumber())
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe($.uglify())
    .pipe($.header(banner))
    .pipe($.rename('units.min.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['styles', 'javascripts', 'dev:styles', 'dev:javascripts', 'dev:htmls']);


/* Development task */

gulp.task('dev:serve', ['dev:styles', 'dev:javascripts', 'dev:htmls'], () => {
  browserSync.init({
    server: './public',
    notify: false,
    ghostMode: false
  });

  gulp.watch('./src/css/**/*.css', ['dev:styles']);
  gulp.watch('./src/ejs/**/*.ejs', ['dev:html-reload']);
  gulp.watch('./src/ejs/_config.json', ['dev:html-reload']);
  gulp.watch('./src/js/**/*.js', ['dev:js-reload']);
});

gulp.task('dev:styles', ['styles'], () => {
  return gulp.src('./src/css/_import.css')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.postcss(processors))
    .pipe($.rename('units.css'))
    .pipe($.sourcemaps.write('./maps'))
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.stream());
});

gulp.task('dev:javascripts', ['javascripts'], () => {
  return gulp.src('./src/js/_import.js')
    .pipe($.plumber())
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe($.rename('units.js'))
    .pipe(gulp.dest('./public/js'));
});

gulp.task('dev:htmls', () => {
  const configFile = './src/ejs/_config.json';
  const config = JSON.parse(fs.readFileSync(configFile, 'utf8'));
  return gulp.src(
    [
      './src/ejs/**/*.ejs',
      '!./src/ejs/**/_*.ejs',
    ]
  )
    .pipe($.plumber())
    .pipe($.ejs({
      config: config,
      pkg: pkg,
    }, {}, {
      ext: '.html'
    }))
    .pipe(gulp.dest('public'));
});

gulp.task('dev:html-reload', ['dev:htmls'], (done) => {
  browserSync.reload();
  done();
});

gulp.task('dev:js-reload', ['dev:javascripts'], (done) => {
  browserSync.reload();
  done();
});

gulp.task('dev', ['dev:serve']);
