'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var config = require(path.join(__dirname, '../utils/config.js'));

describe('iac:template', function () {

  describe('some-template', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/template'))
        .withArguments('some-template')
        .on('end', done);
    });

    it('file path, default content, module title', function () {
      var filePath = 'app/templates/some-template.html';
      assert.fileContent([
        [filePath, 'This is your some-template template!'],
        [filePath, '<ion-view view-title="' + config.DEFAULT_MODULE + ' module">'],
      ]);
    });
  });



  describe('debug', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/template'))
        .withArguments('debug')
        .withOptions({ template: 'debug' })
        .on('end', done);
    });

    it('file path, debug content, module title', function () {
      var filePath = 'app/templates/debug.html';
      assert.fileContent([
        [filePath, 'Password Test:'],
        [filePath, '<ion-view view-title="main debug">'],
      ]);
    });
  });

  describe('list-detail', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/template'))
        .withArguments('list-detail')
        .withOptions({ template: 'list-detail' })
        .on('end', done);
    });

    it('file path, list-detail content', function () {
      var filePath = 'app/templates/list-detail.html';
      assert.fileContent([
        [filePath, '<ion-view view-title="Mr. Yo">'],
      ]);
    });
  });

  describe('list', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/template'))
        .withArguments('list')
        .withOptions({ template: 'list' })
        .on('end', done);
    });

    it('file path, list content, link to list detail', function () {
      var filePath = 'app/templates/list.html';
      assert.fileContent([
        [filePath, '<ion-view view-title="List">'],
        [filePath, 'ui-sref="main.listDetail"']
      ]);
    });
  });

  describe('menu', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/template'))
        .withArguments('menu')
        .withOptions({ template: 'menu' })
        .on('end', done);
    });

    it('file path, menu content, link to list & debug', function () {
      var filePath = 'app/templates/menu.html';
      assert.fileContent([
        [filePath, '<ion-side-menu-content>'],
        [filePath, 'ui-sref="main.list"'],
        [filePath, 'ui-sref="main.debug"'],
      ]);
    });
  });


  describe('tabs', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/template'))
        .withArguments('tabs')
        .withOptions({ template: 'tabs' })
        .on('end', done);
    });

    it('file path, tabs content, module name', function () {
      var filePath = 'app/templates/tabs.html';
      assert.fileContent([
        [filePath, '<ion-tabs'],
        [filePath, 'ui-sref="main.list"'],
        [filePath, 'ui-sref="main.debug"'],
      ]);
    });
  });

});

