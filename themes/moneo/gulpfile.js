var gulp = require('gulp');
var fs = require('fs');
var log = require('fancy-log');
var del = require('del');
var sass = require('gulp-sass');
var merge = require('merge-stream');
var cache = require('gulp-cache');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync').create();

const resource = 'resources';
const assets = 'static/assets';

gulp.task('clean:assets', function () {
  return del([
    '.dev.lock',
    assets+'/vendor/**',
    assets+'/icon/**',
    assets+'/image/**',
    assets+'/font/**',
    assets+'/css/**',
    assets+'/js/**',
  ]);
});

gulp.task('image', function(){
  return gulp.src(resource+'/image/**/*.+(png|jpg|gif|svg)')
    .pipe(cache(imagemin()))
    .pipe(gulp.dest(assets+'/image'))
});

gulp.task('icon', function(){
  return gulp.src(resource+'/icon/**/*.+(png|jpg|gif|svg)')
    .pipe(cache(imagemin()))
    .pipe(gulp.dest(assets+'/icon'))
});

gulp.task('sass', function() {
  return gulp.src(resource+'/sass/**/*.scss')
    .pipe(
      sass({
        outputStyle: 'compressed'
      })
      .on('error', sass.logError)
    )
    .pipe(gulp.dest(assets+'/css'))
    .pipe(browserSync.stream({match: '**/*.css'}));
});

gulp.task('script', function() {
  return gulp.src(resource+'/js/*.js')
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest(assets+'/js'));
});

gulp.task('font', function () {
  return gulp.src(resource+'/font/**/*')
    .pipe(gulp.dest(assets+'/font'));
});

gulp.task('vendor', function() {
  return merge(
    // jQuery
    gulp
      .src([
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/owl.carousel/dist/owl.carousel.js',
      ])
      .pipe(concat('vendor.js'))
      .pipe(uglify())
      .pipe(gulp.dest(assets+'/js')),

    // bxSlider
    gulp
      .src([
        'node_modules/bxslider/dist/jquery.bxslider.min.js',
        'node_modules/bxslider/dist/jquery.bxslider.min.css'
      ])
      .pipe(gulp.dest(assets+'/vendor/bxslider')),
    gulp
      .src('node_modules/bxslider/dist/images/**')
      .pipe(gulp.dest(assets+'/vendor/bxslider/images'))
  );
});

gulp.task('build',['clean:assets'], function () {
  gulp.start(['sass','image','icon','script','vendor','font']);
});

gulp.task('serve', ['build'], function() {
  fs.open('.dev.lock', 'w', function (err) { if (err) throw err;});

  browserSync.init({
    server: {
      baseDir: "./public"
    },
    files: ['./public'],
    reloadDelay: 100
  });

  gulp.watch(resource+'/sass/**/*.scss', ['sass']);
  gulp.watch(resource+'/js/*.js', ['script']);
  gulp.watch(resource+'/font/**', ['font']);
  gulp.watch(resource+'/image/**', ['image']);
  gulp.watch(resource+'/icon/**', ['icon']);
});

gulp.task('post-install', [], function(){
  if(false === fs.existsSync('.dev.lock')){
    gulp.start('serve');
  } else {
    log('⚠️  .dev.lock file exists, running dev server ignored.');
  }
});

gulp.task('default', ['build']);

process.on('SIGINT', function() {
  fs.unlinkSync('.dev.lock');
  log('Bye bye');
  log('🍻');
  process.exit();
});
