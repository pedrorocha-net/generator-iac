'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

describe('iac:generators/pair', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/pair'))
      .withGenerators([ // configure path to subgenerators
        path.join(__dirname, '../generators/controller'),
        path.join(__dirname, '../generators/template'),
      ])
      .withArguments(['myFeature', 'name'])
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'app/myFeature/name.ctrl.js',
      'test/karma/myFeature/name.spec.js',
      'app/templates/name.html'
    ]);
  });
});
