var gulp       = require('gulp');
var sass       = require('gulp-sass');
var webpack    = require('webpack');
var gutil      = require('gulp-util');
var tinyLr     = require('tiny-lr');

var PATHS = {
  js: './src/**/*.js',
  sass: './src/styles/*.scss',
  copy: ['./src/index.html', './src/styles/*.css'],

  dist: './dist',
  webpackConfig: './webpack.config'
}

gulp.task("build-js", function(done) {
  webpack(require(PATHS.webpackConfig), function(err, stats) {
    if (err) {
      // Strip references to the current directory so the lines aren't so long
      var currentDir = new RegExp(__dirname, 'g');
      var message = err.message.replace(currentDir, '.');

      // Print error message
      gutil.log(gutil.colors.red('Webpack build error:'));
      console.log(message);
    } else {
      gutil.log(gutil.colors.blue('Webpack build success'));
    }

    // Let gulp know Webpack is done
    done();
  });
});

gulp.task('compile-sass', function () {
  var sassOptions = process.env.NODE_ENV === 'production' ?
    { outputStyle: 'compressed' } :
    {};

  return gulp.src(PATHS.sass)
             .pipe(sass(sassOptions).on('error', sass.logError))
             .pipe(gulp.dest(PATHS.dist));
});

gulp.task('copy-static', function () {
  return gulp.src(PATHS.copy)
             .pipe(gulp.dest(PATHS.dist));
});

gulp.task('build', ['build-js', 'compile-sass', 'copy-static']);

gulp.task('dev', ['build'], function(done) {
  // Start HTTP server
  require('./server')(PATHS.dist, gutil.log.bind(gutil));

  // Start LiveReload server
  var lrPort = process.env.LR_PORT || 35729;
  var lr = tinyLr();
  lr.listen(lrPort, function() {
    gutil.log(gutil.colors.yellow('LiveReload server listening on port ' + lrPort));
  });

  // Watch the relevant files for changes and rebuild
  gulp.watch(PATHS.js, ['build-js']);
  gulp.watch(PATHS.sass, ['compile-sass']);
  gulp.watch(PATHS.copy, ['copy-static']);

  // When any files get changed in './dist', reload the page
  gulp.watch([PATHS.dist + '/**/*'], function (e) {
    gutil.log(gutil.colors.yellow('LiveReload reloading due to change to'),
              gutil.colors.green(e.path.replace(__dirname, '.')));
    lr.changed({
      body: {
        files: [e.path]
      }
    });
  });
});

gulp.task('default', ['dev']);
