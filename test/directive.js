'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var config = require(path.join(__dirname, '../utils/config.js'));

describe('iac:directive', function () {
  describe('someFeature someName', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/directive'))
        .withArguments(['someFeature', 'someName'])
        .on('end', done);
    });

    it('file, content', function () {
      var filePath = 'app/someFeature/someName.directive.coffee';
      assert.fileContent([
        [filePath, 'angular.module(\'' + config.DEFAULT_MODULE + '\')'],
        [filePath, 'directive \'someName\','],
        [filePath, 'this is the someName directive']
      ]);
    });

    it('spec file, describe signature, critical content', function () {
      var specPath = 'test/karma/someFeature/someName.directive.spec.js';
      assert.fileContent([
        [specPath, 'module: main, directive: someName'],
        [specPath, '<some-name></some-name>'],
        [specPath, 'this is the someName directive']
      ]);
    });
  });

});
