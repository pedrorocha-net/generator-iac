'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var config = require(path.join(__dirname, '../utils/config.js'));

describe('iac:service', function () {

  describe('some', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/service'))
        .withArguments(['myFeature', 'someName'])
        .on('end', done);
    });

    it('file, module name, service signature', function () {
      var filePath = 'app/myFeature/some-name-service.js';
      assert.fileContent([
        [filePath, 'angular.module(\'' + config.DEFAULT_MODULE + '\')'],
        [filePath, 'factory(\'SomeNameFactory\', SomeNameFactory)']
      ]);
    });

    it('spec file, default signature, default content', function () {
      var filePath = 'test/karma/myFeature/some-name-service.spec.js';
      assert.fileContent([
        [filePath, 'describe(\'module: main, service: SomeNameFactory'],
        [filePath, 'it(\'should do something']
      ]);
    });
  });


  describe('some --template=debug', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/service'))
        .withArguments(['myFeature', 'someName'])
        .withOptions({ template: 'debug' })
        .on('end', done);
    });

    it('file, service signature, debug logic', function () {
      var filePath = 'app/myFeature/some-name-service.js';
      assert.fileContent([
        [filePath, 'factory(\'SomeNameFactory\', SomeNameFactory)'],
        [filePath, 'this.someData = {'],
        [filePath, 'this.changeBriefly = function ()']
      ]);
    });

    it('spec file, debug content', function () {
      var filePath = 'test/karma/myFeature/some-name-service.spec.js';
      assert.fileContent([
        [filePath, 'describe(\'.changeBriefly()']
      ]);
    });
  });
});
