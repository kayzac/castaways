var gulp       = require('gulp');
var sass       = require('gulp-sass');
var plumber    = require('gulp-plumber');
var prefix     = require('gulp-autoprefixer');
var uglify     = require('gulp-uglify');
var livereload = require('gulp-livereload');
var nodemon    = require('gulp-nodemon');
var notify     = require('gulp-notify');

var paths = {
  sass: './assets/sass/styles.scss',
  img: './assets/images/**/*',
  js: './assets/js/**/*.js',
  views: './views/**/*',
  fonts: './assets/fonts/**/*'
};

function onError(err) {
  notify.onError(err.message)(err);
  this.emit('end');
}

gulp.task('sass', function(){
  return gulp.src(paths.sass)
    .pipe(plumber(onError))
    .pipe(sass())
    .pipe(prefix())
    .pipe(gulp.dest('public/css'));
});

gulp.task('images', function () {
  return gulp.src(paths.img)
    .pipe(gulp.dest('public/images/'));
});

gulp.task('js', function () {
  return gulp.src(paths.js)
    .pipe(gulp.dest('public/js/'));
});

gulp.task('copy', function () {
  // Copy bower components into public/js/libs
  gulp.src([
    'bower_components/jquery/dist/jquery.js',
    'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js'
  ]).pipe(uglify())
    .pipe(gulp.dest('public/js/libs'));

  // Copy fonts into public/fonts
  gulp.src(paths.fonts)
    .pipe(gulp.dest('public/fonts'));
});

gulp.task('watch', function() {
  gulp.watch('./assets/sass/**/*.scss', ['sass']);
  gulp.watch(paths.img, ['images']);
  gulp.watch(paths.js, ['js']);

  gulp.watch([
    'public/**/*',
    paths.views
  ]).on('change', function(file) {
    livereload.changed(file.path);
  });
});

gulp.task('serve', function() {
  livereload.listen();

  nodemon({
    script: 'server.js',
    ext: 'js',
    ignore: ['./assets/**', 'public/**']
  }).on('restart', function () {
      console.log('restarted! ' + (new Date()));
    });
});

gulp.task('build', ['sass', 'images', 'js', 'copy']);

gulp.task('default', ['build', 'serve', 'watch']);

