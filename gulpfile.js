let gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create(),
    uglify = require('gulp-uglify-es').default,
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    csso = require('gulp-csso'),
    imagemin = require('gulp-imagemin'),
    webp = require('gulp-webp'),
    svgstore = require('gulp-svgstore'),
    posthtml = require('gulp-posthtml'),
    include = require('posthtml-include'),
    del = require('del'),
    ghPages = require('gulp-gh-pages');

gulp.task('clean', async function(){
  del.sync('build')
})

gulp.task('copy', function () {
  return gulp.src([
    'app/fonts/**/*.{woff,woff2}',
    'app/images/**',
  ], {
    base: 'app'
  })
  .pipe(gulp.dest('build'));
});

gulp.task('deploy', function() {
  return gulp.src('./build/**/*')
    .pipe(ghPages());
});

gulp.task('css', function() {
  return gulp.src([
    'node_modules/normalize.css/normalize.css',
    'node_modules/swiper/swiper-bundle.min.css',
    'app/css/jquery.formstyler.css',
  ])
    .pipe(concat('libs.scss'))
    .pipe(gulp.dest('app/scss'))
});

gulp.task('scss', function () {
  return gulp.src([
    'app/scss/libs.scss',
    'app/scss/style.scss'
  ])
  .pipe(sourcemaps.init())
  .pipe(sass({outputStyle: 'compressed'}))
  .pipe(autoprefixer({
    overrideBrowserslist: ['last 5 versions'],
    cascade: false
  }))
  .pipe(csso())
  .pipe(rename({suffix: '.min'}))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('build/css'))
  .pipe(browserSync.reload({stream: true}))
});

gulp.task('html', function () {
  return gulp.src('app/*.html')
  .pipe(posthtml([
    include()
  ]))
  .pipe(gulp.dest('build'))
  .pipe(browserSync.reload({stream: true}))
});

gulp.task('script', function () {
  return gulp.src('app/js/_*.js')
  .pipe(concat('main.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('build/js'))
  .pipe(browserSync.reload({stream: true}))
});

gulp.task('js', function () {
  return gulp.src([
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/swiper/swiper-bundle.min.js',
    'app/js/jquery.formstyler.min.js',
    'node_modules/picturefill/dist/picturefill.min.js',
    'app/js/svg4everybody.min.js'
  ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build/js'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('images', function () {
  return gulp.src("app/images/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.mozjpeg({quality: 80, progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest('build/images'));
});

gulp.task('webp', function () {
  return gulp.src('app/images/**/*.{png,jpg}')
    .pipe(webp({quality: 85}))
    .pipe(gulp.dest('app/images'));
});

gulp.task('sprite', function () {
  return gulp.src('app/images/icon-*.svg')
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/images'))
});

gulp.task('browser-sync', function() {
  browserSync.init({
      server: {
          baseDir: "build/"
      },
      notify: false,
      open: true,
  });

  gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'));
  gulp.watch('app/images/icon-*.svg', gulp.series('sprite', 'html', 'refresh'));
  gulp.watch('app/*.html', gulp.parallel('html'));
  gulp.watch('app/js/*.js', gulp.series('js', 'script'));
});

gulp.task('refresh', function (done) {
  browserSync.reload();
  done();
});

gulp.task('build', gulp.series(
  'clean',
  'copy',
  'css',
  'scss',
  'js',
  'script',
  'webp',
  'images',
  'sprite',
  'html'
));

gulp.task('default', gulp.series('build', 'browser-sync'));
