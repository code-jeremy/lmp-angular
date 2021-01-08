const gulp = require('gulp');
const gutil = require('gulp-util');
const concat = require('gulp-concat');
// const uglify = require('gulp-uglify');
const uglify = require('gulp-uglify-es').default;
const jshint = require('gulp-jshint');
const useref = require('gulp-useref');
const cssnano = require('gulp-cssnano');
const gulpIf = require('gulp-if');
const htmlify = require('gulp-angular-htmlify');
const flatten = require('gulp-flatten');
const sourcemaps = require('gulp-sourcemaps');
const strip = require('gulp-strip-comments');
const autoprefixer = require( 'gulp-autoprefixer');
const prompt = require('gulp-prompt');
const htmlmin = require('gulp-htmlmin');
const babel = require('gulp-babel');
const gzip = require('gulp-gzip');
const replace = require('gulp-replace');
const fs = require('fs');
const inline = require('gulp-inline');
const sequence = require('run-sequence');
const rel = require('gulp-remove-empty-lines');
const merge = require('merge-stream');
const concatsrc = require('gulp-concat-sourcemap');
const brotli = require('gulp-brotli');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass');
const server = require('gulp-server-livereload');


/**
 * Project paths
 */
const paths = {
  html: [
    'source/app/*.html'
  ],
  js: [
    'node_modules/zenscroll/zenscroll-min.js',
    'node_modules/svgxuse/svgxuse.min.js',
    'node_modules/howler/dist/howler.core.min.js',
    'node_modules/angular/angular.min.js',
    'node_modules/angular-sanitize/angular-sanitize.min.js',
    'node_modules/angular-animate/angular-animate.min.js',
    'node_modules/@uirouter/angularjs/release/angular-ui-router.min.js',
    'node_modules/ngstorage/ngStorage.min.js',
    'node_modules/ng-sortable/dist/ng-sortable.min.js',
    'node_modules/angular-modal-service/dst/angular-modal-service.min.js',
    'node_modules/angular-socialshare/dist/angular-socialshare.min.js',
    'node_modules/angular-loading-bar/build/loading-bar.min.js',
    'node_modules/angularjs-slider/dist/rzslider.min.js',
    'node_modules/angular-recaptcha/release/angular-recaptcha.min.js',
  ],
  ng: [
    'source/lmp-audio/*.js',
    'source/lmp/js/state-configurations/**/*.js',
    'source/lmp/js/lmp.module.js',
    'source/lmp/js/lmp.config.js',
    'source/lmp/js/lmp.run.js',
    'source/app/**/*.js',
    'source/lmp/js/lmp.bootstrap.js'
  ],
  css: [
    'node_modules/angular-loading-bar/build/loading-bar.min.css',
    'node_modules/angularjs-slider/dist/rzslider.min.css',
    'source/lmp/css/reset.css',
    // 'source/lmp/css/fonts.css',
    'source/lmp/css/grid.css',
    'source/lmp/css/general.css',
    'source/lmp/css/*.css',
    'source/app/**/*.css',
    'source/app/**/*.scss'
  ],
  offline_js: [
    'node_modules/svgxuse/svgxuse.min.js',
  ],
  offline_css: [
    'source/maintenance/style.css'
  ]
};

const ngAttributes = [
  'ui-',
  'ng-',
  'site-header',
  'lmp-player',
  'slides',
  'lmp-slider',
  'comments'
];

gulp.task('build', function (cb) {
    sequence('ng', 'scripts', 'js', 'js-gzip', 'js-br', cb);
});

gulp.task('style', function (cb) {
    sequence('css', 'index', cb);
});

/** 
 * Add data attributes to all angular attributes for verification
 */
gulp.task('html', function() {
  gulp.src(['source/**/*.html'])
    .pipe(htmlify({customPrefixes: ngAttributes}))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(flatten())
    .pipe(gulp.dest('dist/views'));
});

gulp.task('sm', function() {
  gulp.src('bower_components/angular-rangeslider/angular.rangeSlider.js')
    .pipe(sourcemaps.init())
    .pipe(concat('rs.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write(''))
    .pipe(gulp.dest('bower_components/angular-rangeslider'));
});

/** 
 * JS Lint - gulp jslint
 */
gulp.task('jslint', function() {
  return gulp.src(paths.ng)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

/**
 * Build JS
 */
gulp.task('scripts', function(){
  return gulp.src(paths.js)
    .pipe(strip())
    .pipe(flatten())
    .pipe(concat('scripts.min.js'))
    .pipe(gulp.dest('dist/assets/js'));
});

gulp.task('js', () => {
  return gulp.src([
    'dist/assets/js/scripts.min.js',
    'dist/assets/js/lmp-app.min.js'
  ])
  .pipe(concat('bundle.min.js'))
  .pipe(gulp.dest('dist/assets/js'))
})

gulp.task('js-gzip', function() {
  return gulp.src('dist/assets/js/bundle.min.js')
    .pipe(gzip())
    .pipe(gulp.dest('dist/assets/js'));
});

gulp.task('js-br', function() {
  return gulp.src('dist/assets/js/bundle.min.js')
    .pipe(brotli.compress())
    .pipe(gulp.dest('dist/assets/js'));
});

gulp.task('bowser', function(){
  return gulp.src(paths.js)
    .pipe(sourcemaps.init())
    .pipe(strip())
    .pipe(concat('bowser.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write(''))
    .pipe(gulp.dest('node_modules/angular-bowser/dist'));
});

/**
 * JS Lint player
 */
gulp.task('jslintplayer', function() {
  return gulp.src(paths.player)
    .pipe(jshint({
      esversion: 6
    }))
    .pipe(jshint.reporter('default'));
});

/** 
 * Build CSS
 */ 
gulp.task('css', function() {
  return gulp.src(paths.css)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    //.pipe(cssnano({zindex: false}))
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(concat('styles.min.css'))
    .pipe(gulp.dest('dist/assets/css'));
});

// gulp.task('sass', function () {
//   return gulp.src('./sass/**/*.scss')
//     .pipe(sass().on('error', sass.logError))
//     .pipe(gulp.dest('./css'));
// });

/** 
 * Build angular app
 */
gulp.task('ng', function() {
  gulp.src(paths.ng )
    // .pipe(babel({
    //   presets: ['es2015']
    // }))
    .pipe(flatten())
    .pipe(uglify({
      compress: true
    }))
    .pipe(concat('lmp-app.min.js'))
    .pipe(gulp.dest('dist/assets/js'));
});

/**
 * HTMLify index
 */
gulp.task('index', function () {
  return gulp.src(['source/index.html'])
    .pipe(htmlify({customPrefixes: ['ui-', 'lmp-', 'loader', 'site-']}))
    .pipe(inline({
      base: 'public/',
      // js: uglify,
      // css: [minifyCss, autoprefixer({ browsers:['last 2 versions'] })],
      disabledTypes: ['svg', 'img', 'js'], // Only inline css files
      // ignore: ['./css/do-not-inline-me.css']
    }))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist/'));
});

/**
 * Maintenance mode page
 */
gulp.task('offline-js', function(){
  return gulp.src(paths.offline_js)
    .pipe(strip())
    .pipe(concat('bundle.min.js'))
    .pipe(gulp.dest('dist/maintenance/assets/js'));
});

gulp.task('offline-css', function() {
  return gulp.src(paths.offline_css)
    .pipe(concat('styles.min.css'))
    .pipe(autoprefixer())
    .pipe(cssnano({zIndex: false}))
    .pipe(gulp.dest('dist/maintenance/assets/css'));
});

gulp.task('offline-html', function() {
  gulp.src(['source/maintenance/index.html'])
    .pipe(gulp.dest('dist/maintenance'));
});

gulp.task('webserver', function() {
  gulp.src('./dist')
    .pipe(server({
      livereload: true,
      directoryListing: false,
      open: true
    }));
});