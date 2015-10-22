'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

var utils = require('../utils/utils.js');

describe('iac:module', function () {

  var basicFilesTests = function (moduleName, options) {
    var moduleFolder = utils.moduleFolder(moduleName);
    var modulePath = '';

    if (moduleFolder === 'main') {
      modulePath = 'app';
    }
    else {
      modulePath = 'app/' + moduleFolder;
    }

    it('basic files and folders', function () {
      assert.file([
        modulePath + '/' + moduleFolder + '.coffee',
        modulePath + '/assets/images',
        modulePath + '/constants',
        modulePath + '/assets/styles/' + moduleFolder + '.scss',
        modulePath + '/templates'
      ]);

      // module.js
      var moduleFile = modulePath + '/' + moduleFolder + '.coffee';
      assert.fileContent(moduleFile, '.state \'' + moduleName + '\'');
      assert.fileContent(moduleFile, 'url: \'/' + moduleFolder + '\'');

      // config
      var configPath = modulePath + '/constants/';
      var configName = '';
      if (options && options.mainModule) {
        configPath += 'config.constant.js';
        configName = utils.configName();
      }
      else {
        configPath += moduleFolder + '-config.constant.js';
        configName = utils.configName(moduleName);
      }

      assert.fileContent(configPath, '.constant(\'' + configName + '\'');
      assert.fileContent(configPath, 'ENV: {');
    });
  };


  var mainModuleTests = function () {

    it('--mainModule (ionicCss) tests', function () {
      assert.file([
        'app/constants/env-dev.json',
        'app/constants/env-prod.json'
      ]);
    });
  };

  var ionicCssTests = function (moduleName) {
    var moduleFolder = utils.moduleFolder(moduleName);

    it('ionicCss', function () {
      assert.noFileContent('app/assets/styles/' + moduleFolder + '.scss', '$light');
    });
  };

  var ionicSassTests = function (moduleName) {
    var moduleFolder = utils.moduleFolder(moduleName);

    it('ionicSass', function () {
      assert.fileContent('app/assets/styles/' + moduleFolder + '.scss', '$light');
    });
  };

  var tabsTests = function (moduleName, options) {
    var moduleFolder = utils.moduleFolder(moduleName);
    var modulePath = '';

    if (moduleFolder === 'main') {
      modulePath = 'app';
    }
    else {
      modulePath = 'app/' + moduleFolder;
    }

    it('tabs tests', function () {
      assert.file([
        modulePath + '/assets/images/yo@2x.png',
      ]);

      var moduleFile = modulePath + '/' + moduleFolder + '.coffee';
      var serviceFile = modulePath + '/main/' + moduleFolder + '.service.coffee';
      var serviceName = utils.serviceName(moduleName);
      var debugCtrlFile, debugCtrlName;
      var debugSpecFile;
      var configName;

      // mainModule tests
      if (options && options.mainModule) {
        debugCtrlFile = modulePath + '/main/DebugCtrl.ctrl.coffee';
        debugCtrlName = utils.controllerName('Debug');
        debugSpecFile = 'test/protractor/main-debug.spec.js';
        configName = utils.configName();

        // module.js
        assert.fileContent(moduleFile, 'otherwise \'/' + moduleFolder + '/list');
      }

      // in any case
      assert.fileContent([
        // module.js
        [moduleFile, 'abstract: true'],
        [moduleFile, 'templateUrl: \'templates/tabs.html\''],
        [moduleFile, '.state \'' + moduleName + '.list'],
        [moduleFile, 'templateUrl: \'templates/list.html\''],
        [moduleFile, '.state \'' + moduleName + '.listDetail'],
        [moduleFile, 'templateUrl: \'templates/list-detail.html\''],
        [moduleFile, '.state \'' + moduleName + '.debug'],
        [moduleFile, 'templateUrl: \'templates/debug.html\''],
        [moduleFile, 'controller: \'' + debugCtrlName + ' as ctrl'],

        // // template files
        [debugCtrlFile, 'controller \'' + debugCtrlName],
        [debugCtrlFile, serviceName + ', ' + configName],
        [debugCtrlFile, '@someData = ' + serviceName],
        [debugCtrlFile, '@ENV = ' + configName],
        [debugCtrlFile, '@BUILD = ' + configName],
        [serviceFile, 'factory \'' + serviceName],
      ]);

      // templates
      assert.fileContent([
        [modulePath + '/templates/debug.html', 'ctrl.someData.binding'],
        [modulePath + '/templates/list-detail.html', 'I scaffold apps'],
        [modulePath + '/templates/list.html', 'Learn more...'],
        [modulePath + '/templates/list.html', moduleName + '.listDetail'],
        [modulePath + '/templates/tabs.html', '<ion-tabs'],
        [modulePath + '/templates/tabs.html', moduleName + '.list'],
        [modulePath + '/templates/tabs.html', moduleName + '.debug'],
      ]);

      // tests
      assert.fileContent([
        [debugSpecFile, 'browser.get(\'/#/' + moduleFolder + '/debug']
      ]);
    });
  };

  describe('main (main, tabs)', function () {
    var options = {
      mainModule: true,
      ionicCss: true
    };

    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/module'))
        .withGenerators([ // configure path to  subgenerators
          path.join(__dirname, '../generators/controller'),
          path.join(__dirname, '../generators/template'),
          path.join(__dirname, '../generators/service'),
          path.join(__dirname, '../generators/constant')
        ])
        .withArguments('main')
        .withPrompts({ template: 'tabs' })
        .withOptions(options)
        .on('end', done);
    });

    basicFilesTests('main', options);
    mainModuleTests('main');
    ionicCssTests('main');
    tabsTests('main', options);
  });

  describe('ionicSass tests', function () {
    var options = {
      mainModule: true,
    };

    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/module'))
        .withGenerators([ // configure path to  subgenerators
          path.join(__dirname, '../generators/controller'),
          path.join(__dirname, '../generators/template'),
          path.join(__dirname, '../generators/service'),
          path.join(__dirname, '../generators/constant')
        ])
        .withArguments('main')
        .withPrompts({ template: 'tabs'})
        .withOptions(options)
        .on('end', done);
    });

    ionicSassTests('main');
  });


  var sideMenuTests = function (moduleName, options) {
    var moduleFolder = utils.moduleFolder(moduleName);
    var modulePath = '';

    if (moduleFolder === 'main') {
      modulePath = 'app';
    }
    else {
      modulePath = 'app/' + moduleFolder;
    }

    it('sideMenu tests', function () {
      assert.file([
        modulePath + '/assets/images/yo@2x.png',
      ]);

      var moduleFile = modulePath + '/' + moduleFolder + '.coffee';
      var serviceFile = modulePath + '/main/' + moduleFolder + '.service.coffee';
      var serviceName = utils.serviceName(moduleName);
      var debugCtrlFile, debugCtrlName;
      var menuCtrlFile, menuCtrlName;
      var configName;

      // mainModule tests
      if (options && options.mainModule) {
        menuCtrlFile = modulePath + '/main/MenuCtrl.ctrl.coffee';
        menuCtrlName = utils.controllerName('Menu');
        debugCtrlFile = modulePath + '/main/DebugCtrl.ctrl.coffee';
        debugCtrlName = utils.controllerName('Debug');
        configName = utils.configName();

        // module.js
        assert.fileContent(moduleFile, 'otherwise \'/' + moduleFolder + '/list');
      }


      // in any case
      assert.fileContent([
        // module.js
        [moduleFile, 'abstract: true'],
        [moduleFile, 'templateUrl: \'templates/menu.html\''],
        [moduleFile, 'controller: \'' + menuCtrlName + ' as menu\''],
        [moduleFile, '.state \'' + moduleName + '.list'],
        [moduleFile, 'templateUrl: \'templates/list.html\''],
        [moduleFile, '.state \'' + moduleName + '.listDetail'],
        [moduleFile, 'templateUrl: \'templates/list-detail.html\''],
        [moduleFile, '.state \'' + moduleName + '.debug'],
        [moduleFile, 'templateUrl: \'templates/debug.html\''],
        [moduleFile, 'controller: \'' + debugCtrlName + ' as ctrl'],

        // template files
        [debugCtrlFile, 'controller \'' + debugCtrlName],
        [debugCtrlFile, serviceName + ', ' + configName],
        [debugCtrlFile, '@someData = ' + serviceName],
        [debugCtrlFile, '@ENV = ' + configName],
        [debugCtrlFile, '@BUILD = ' + configName],
        [serviceFile, 'factory \'' + serviceName],
        [menuCtrlFile, 'controller \'' + menuCtrlName],
      ]);

      // templates
      assert.fileContent([
        [modulePath + '/templates/debug.html', 'ctrl.someData.binding'],
        [modulePath + '/templates/list-detail.html', 'I scaffold apps'],
        [modulePath + '/templates/list.html', 'Learn more...'],
        [modulePath + '/templates/list.html', moduleName + '.listDetail'],
        [modulePath + '/templates/menu.html', '<ion-side-menu'],
        [modulePath + '/templates/menu.html', moduleName + '.list'],
        [modulePath + '/templates/menu.html', moduleName + '.debug'],
      ]);

    });
  };

  describe('main (main, sidemenu)', function () {
    var options = {
      mainModule: true
    };

    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/module'))
        .withGenerators([ // configure path to  subgenerators
          path.join(__dirname, '../generators/controller'),
          path.join(__dirname, '../generators/template'),
          path.join(__dirname, '../generators/service'),
          path.join(__dirname, '../generators/constant')
        ])
        .withArguments('main')
        .withPrompts({ template: 'sidemenu' })
        .withOptions(options)
        .on('end', done);
    });

    basicFilesTests('main', options);
    mainModuleTests('main');
    sideMenuTests('main', options);
  });


  var blankTests = function (moduleName) {
    var moduleFolder = utils.moduleFolder(moduleName);
    var modulePath = '';

    if (moduleFolder === 'main') {
      modulePath = 'app';
    }
    else {
      modulePath = 'app/' + moduleFolder;
    }

    it('blank tests', function () {
      assert.noFile([
        modulePath + '/assets/images/yo@2x.png',
      ]);

      // module.js
      var moduleFile = modulePath + '/' + moduleFolder + '.coffee';
      assert.fileContent(moduleFile, 'view-title="' + moduleName + '">');
      assert.fileContent(moduleFile, '/' + moduleFolder);
    });
  };

  describe('main (main, blank)', function () {
    var options = {
      mainModule: true
    };

    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/module'))
        .withGenerators([ // configure path to subgenerators
          path.join(__dirname, '../generators/controller'),
          path.join(__dirname, '../generators/template'),
          path.join(__dirname, '../generators/service'),
          path.join(__dirname, '../generators/constant')
        ])
        .withPrompts({ template: 'blank' })
        .withOptions(options)
        .withArguments('main')
        .on('end', done);
    });

    basicFilesTests('main', options);
    mainModuleTests('main');
    blankTests('main', options);
  });


});
