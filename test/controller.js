'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var config = require(path.join(__dirname, '../utils/config.js'));

describe('iac:controller', function () {

  describe('some', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/controller'))
        .withArguments(['someFeature', 'someName'])
        .on('end', done);
    });

    it('file, module name, controller signature', function () {
      var filePath = 'app/someFeature/someName.ctrl.js';
      assert.fileContent([
        [filePath, 'angular.module(\'' + config.DEFAULT_MODULE + '\')'],
        [filePath, 'controller(\'SomeNameCtrl\', SomeNameCtrl)']
      ]);
    });

    it('spec file, default signature, default content', function () {
      var filePath = 'test/karma/someFeature/someName.spec.js';
      assert.fileContent([
        [filePath, 'describe(\'module: main, controller: SomeNameCtrl']
        // [filePath, 'it(\'should do something\', function () {']
      ]);
    });
  });

  describe('myFeature someCtrl', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/controller'))
        .withArguments(['myFeature', 'some'])
        .on('end', done);
    });

    it('file, module name', function () {
      var filePath = 'app/myFeature/some.ctrl.js';
      assert.fileContent([
        [filePath, 'angular.module(\'main\')']
      ]);
    });

    it('spec file, default signature', function () {
      var filePath = 'test/karma/myFeature/some.spec.js';
      assert.fileContent([
        [filePath, 'describe(\'module: main, controller: SomeCtrl']
      ]);
    });
  });

  describe('myFeature someCtrl --template=debug', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/controller'))
        .withArguments(['myFeature', 'some'])
        .withOptions({ template: 'debug' })
        .on('end', done);
    });

    it('file, controller signature, debug logic & placeholders', function () {
      var filePath = 'app/myFeature/some.ctrl.js';
      assert.fileContent([
        [filePath, '$log, Main, Config'],
        [filePath, 'this.someData = Main.'],
        [filePath, 'this.ENV = Config.ENV'],
        [filePath, 'this.BUILD = Config.BUILD'],
        [filePath, 'this.grade = ']
      ]);
    });

    it('spec file, debug content', function () {
      var filePath = 'test/karma/myFeature/some.spec.js';
      assert.fileContent([
        [filePath, 'describe(\'.grade()']
      ]);
    });
  });

});
