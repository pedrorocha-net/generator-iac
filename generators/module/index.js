'use strict';
var yeoman = require('yeoman-generator');
var mkdirp = require('mkdirp');

var utils = require('../../utils/utils.js');
var sampleAnswers = require('../app/sources/sample-answers.js');

module.exports = yeoman.generators.NamedBase.extend({

  initializing: function () {
    this.log('You called the iac:module subgenerator with the argument ' + this.name + '.');

    this.moduleName = utils.moduleName(this.name);
    this.controllerName = utils.controllerName(this.name);
    this.fileName = utils.fileName(this.name);
    this.moduleFolder = utils.moduleFolder(this.moduleName);
  },

  prompting: function () {
    // prompt and save results in this.answers

    if (!this.options['skip-prompts']) {
      // tell yeoman we're doing asynchronous stuff here
      // so it can wait with subsequent tasks
      var done = this.async();

      this.prompt({
        type: 'list',
        name: 'template',
        message: 'Choose a starter template',
        choices: [
          {
            value: 'sidemenu',
            name: 'sidemenu'
          },
          {
            value: 'tabs',
            name: 'tabs',
          },
          {
            value: 'blank',
            name: 'blank'
          }
        ]
      },
      function (answers) { // prompt
        this.answers = answers;

        done();
      }.bind(this));
    }
    else {
      this.answers = sampleAnswers.getStandard();
    }
  },

  writing: function () {

    // basic files
    var modulePath = 'app/';
    mkdirp.sync(modulePath);
    mkdirp.sync(modulePath + '/assets/images');
    mkdirp.sync(modulePath + '/constants/');
    mkdirp.sync(modulePath + '/assets/styles/');
    mkdirp.sync(modulePath + '/templates/');

    // basic templated files
    if (this.options.mainModule) {
      this.menuCtrlName = utils.controllerName('Menu');
      this.debugCtrlName = utils.controllerName('Debug');
    }
    else {
      this.menuCtrlName = utils.controllerName(this.moduleName + 'Menu');
      this.debugCtrlName = utils.controllerName(this.moduleName + 'Debug');
    }
    this.template('_module.js', modulePath + '/' + this.moduleFolder + '.js');
    this.template('_module.scss', modulePath + '/assets/styles/' + this.moduleFolder + '.scss');
    // create config constant
    this.composeWith('iac:constant', {
      arguments: utils.configName(this.moduleName),
      options: {
        template: 'config'
      }
    });

    // main module files
    if (this.options.mainModule) {
      this.copy('env-dev.json', modulePath + '/constants/env-dev.json');
      this.copy('env-prod.json', modulePath + '/constants/env-prod.json');
    }

    // both (sidemenu & tabs)
    if (this.answers.template !== 'blank') {
      // yo@2x.png
      this.copy('yo.png', modulePath + '/assets/images/yo@2x.png');
      // spec file
      this.template('_module-debug.spec.js', 'test/protractor/' + this.moduleFolder + '-debug.spec.js');

      // debug
      this.composeWith('iac:controller', {
        arguments: this.moduleName + ' ' + this.debugCtrlName,
        options: { template: 'debug' }
      });
      this.composeWith('iac:template', {
        arguments: 'debug ' + this.moduleName,
        options: { template: 'debug' }
      });
      this.composeWith('iac:service', {
        arguments: this.moduleName  + ' ' + this.name,
        options: {  template: 'debug' }
      });

      // other templates
      this.composeWith('iac:template', {
        arguments: 'list ',
        options: { template: 'list' }
      });
      this.composeWith('iac:template', {
        arguments: 'list-detail ',
        options: { template: 'list-detail' }
      });
    }
    // sidemenu
    if (this.answers.template === 'sidemenu') {
      // menu
      this.composeWith('iac:controller', {
        arguments: this.moduleName + ' ' + this.menuCtrlName,
      });
      this.composeWith('iac:template', {
        arguments: 'menu ',
        options: { template: 'menu' }
      });
    }

    // tabs
    if (this.answers.template === 'tabs') {
      // tabs
      this.composeWith('iac:template', {
        arguments: 'tabs',
        options: { template: 'tabs' }
      });
    }
  }
});
