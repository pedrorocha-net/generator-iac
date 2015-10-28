'use strict';
// gulp
var gulp = require('gulp');
var options = gulp.options;
var paths = gulp.paths;
// plugins
var $ = require('gulp-load-plugins')();
// modules
var del = require('del');
var vinylPaths = require('vinyl-paths');

var buildDependencies = [
  options['force-build'] ? 'linting' : 'linting-throw',
  'build-app',
  'build-templates',
  'build-assets'
];

gulp.task('build', buildDependencies, function () {
  return gulp.src(paths.dist + '/**/*')
    .pipe($.size({showFiles: true}));
});

gulp.task('clean', function () {
  return gulp.src(['.tmp', paths.dist + '/*'])
    .pipe(vinylPaths(del));
});

// concatenate files in build:blocks inside index.html
// and copy to build folder destinations
gulp.task('build-app', ['inject-all'], function () {
  var assets = $.useref.assets({searchPath: '{.tmp,app}'});
  var jsFilter = $.filter('**/*.js', {restore: true});
  var cssFilter = $.filter('**/*.css', {restore: true});

  var stream = gulp.src('app/index.html') // main html file
    .pipe(assets); // all assets (without index.html)

  if (options.minify) {
    stream
      .pipe(jsFilter)
      .pipe($.ngAnnotate({
        add: true,
        sourcemap: true
      }))
      .pipe($.uglify())
      .pipe(jsFilter.restore)
      .pipe(cssFilter)
      .pipe($.csso())
      .pipe(cssFilter.restore);
  }

  stream
    .pipe(assets.restore()) // switch back to index
    .pipe($.useref())
    .pipe(gulp.dest(paths.dist));

  return stream;
});

// copy templates
gulp.task('build-templates', function () {
  return gulp.src('app/templates/**/*.html')
  .pipe($.if(options.minify, $.minifyHtml()))
  .pipe(gulp.dest(paths.dist + '/templates/'));
});

// copy assets, wait for fonts
gulp.task('build-assets', ['bower-fonts', 'build-images', 'build-config'], function () {
  return gulp.src('.tmp/assets/**/*')
    .pipe($.if(options.minify, $.imagemin()))
    .pipe(gulp.dest(paths.dist + '/assets/'));
});

gulp.task('build-images', function(){
  return gulp.src('app/assets/images/**/*')
      .pipe($.if(options.minify, $.imagemin()))
      .pipe(gulp.dest(paths.dist + '/assets/images/'));
});


gulp.task('build-config', function(){
  return gulp.src('app/constants/**/*.js')
      .pipe($.if(options.minify, $.imagemin()))
      .pipe(gulp.dest(paths.dist + '/constants/'));
});
