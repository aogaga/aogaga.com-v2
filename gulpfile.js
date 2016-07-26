var gulp = require('gulp');
var jade = require('gulp-jade');
var plumber = require('gulp-plumber');
var compass = require('gulp-compass');
var $    = require('gulp-load-plugins')();
var browserSync =  require('browser-sync').create();


var dst = 'build/';
// css locations
var cssDst = dst+'/css';


var sassPaths = [
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src'
];



gulp.task('serve', function(){
   browserSync.init({
        server: {
            baseDir: "./build/"
        }
    });

});


gulp.task('sass', function() {
  return gulp.src('scss/app.scss')
    .pipe($.sass({
      includePaths: sassPaths,
      outputStyle: 'compressed' // if css compressed **file size**
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))

    .pipe(gulp.dest(dst+'/css'));
});


gulp.task('jade', function(){

  return gulp.src('jade/**/*.jade')

    .pipe(plumber({
    errorHandler: function (err) {
      console.log(err);
      this.emit('end');
    }
    }))

    .pipe(jade())
    .pipe(gulp.dest(dst))



    .pipe(browserSync.reload({
      stream: true
    }))

});



gulp.task('default', ['sass','serve','jade'], function() {

  gulp.watch(['scss/**/*.scss'], ['sass']);
  gulp.watch('jade/**/*.jade', ['jade']);
  gulp.watch(['scss/**/*.scss'], browserSync.reload);
  gulp.watch("build/*.html").on('change', browserSync.reload);
});
