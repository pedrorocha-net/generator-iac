'use strict';
// gulp
var gulp = require('gulp');
var path = require('path');
var paths = gulp.paths;
var options = gulp.options;
// plugins
var $ = require('gulp-load-plugins')();
// modules
var Server = require('karma').Server;
var bs = require('browser-sync');

// KARMA
function runKarma (singleRun, done) {
  new Server({
    configFile: path.join(__dirname, '/../karma.conf.js'),
    singleRun: singleRun,
    autoWatch: !singleRun
  }, done).start();
}

gulp.task('karma', ['coffee', 'linting'], function (done) {
  runKarma(true, done);
});

gulp.task('karma:auto', ['coffee', 'linting'], function (done) {
  runKarma(false, done);
});

gulp.task('test', ['linting', 'istanbul'], function (done) {
  console.log('testing...');
});

gulp.task('istanbul', function (cb) {
  gulp.src('.tmp/**/*.js')
    .pipe($.istanbul()) // Covering files
    .pipe($.istanbul.hookRequire())
    .on('finish', function () {
      gulp.src('test/karma/**/*.js', {cwd: __dirname})
        .pipe($.plumber())
        .pipe($.mocha())
        .pipe($.istanbul.writeReports()) // Creating the reports after tests ran
        .on('finish', function () {
          process.chdir(__dirname);
          cb();
        });
    });
});

// PROTRACTOR
// Downloads the selenium webdriver
gulp.task('webdriver-update', $.protractor.webdriver_update);
gulp.task('webdriver-standalone', $.protractor.webdriver_standalone);

function runProtractor (done) {
  gulp.src(paths.protractor)
    .pipe($.protractor.protractor({
      configFile: 'protractor.conf.js'
    }))
    .on('error', function (err) {
      // Make sure failed tests cause gulp to exit non-zero
      throw err;
    })
    .on('end', function () {
      bs.exit();
      done();
    });
}

gulp.task('protractor', ['serve', 'linting', 'webdriver-update'], function (done) {
  runProtractor(done);
});

var protractorBuildDeps = ['serve-build', 'webdriver-update'];
if (options.build !== false) {
  protractorBuildDeps.push('build');
}
gulp.task('protractor-build', protractorBuildDeps, function (done) {
  gulp.start('linting');

  runProtractor(done);
});
