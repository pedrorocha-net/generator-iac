'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var config = require(path.join(__dirname, '../utils/config.js'));

describe('iac:filter', function () {
  describe('someFeature someName', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/filter'))
        .withArguments(['someFeature', 'someName'])
        .on('end', done);
    });

    it('file, content', function () {
      var filePath = 'app/someFeature/someName.filter.js';
      assert.fileContent([
        [filePath, 'angular.module(\'' + config.DEFAULT_MODULE + '\')'],
        [filePath, 'filter(\'someName\','],
        [filePath, 'someName filter: ']
      ]);
    });

    it('spec file, describe signature, critical content', function () {
      var specPath = 'test/karma/someFeature/someName.filter.spec.js';
      assert.fileContent([
        [specPath, 'module: main, filter: someName'],
        [specPath, '"someName filter:"'],
        [specPath, 'toBe(\'someName filter:']
      ]);
    });
  });
});
