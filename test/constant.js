'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var config = require(path.join(__dirname, '../utils/config.js'));

describe('iac:constant', function () {
  describe('iac:constant some', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/constant'))
        .withArguments('some')
        .on('end', done);
    });

    it('constant file contents', function () {
      var filePath = 'app/constants/some-constant.js';
      assert.fileContent([
        [filePath, 'angular.module(\'' + config.DEFAULT_MODULE + '\')'],
        [filePath, 'constant(\'some\','],
        [filePath, 'CONSTANT_1: \'meaningful value\'']
      ]);
    });
  });

  describe('iac:constant someThing myModule', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/constant'))
        .withArguments('someThing myModule')
        .on('end', done);
    });

    it('constant file contents', function () {
      var filePath = 'app/constants/some-thing-constant.js';
      assert.fileContent([
        [filePath, 'angular.module(\'myModule\')'],
        [filePath, 'constant(\'someThing\','],
        [filePath, 'CONSTANT_1: \'meaningful value\'']
      ]);
    });
  });

  describe('iac:constant myConstant --template=config', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/constant'))
        .withArguments('myConstant')
        .withOptions({ template: 'config' })
        .on('end', done);
    });

    it('constant file contents', function () {
      var filePath = 'app/constants/my-constant-constant.js';
      assert.fileContent(filePath, 'ENV: {');
    });
  });
});
