'use strict';
var yeoman = require('yeoman-generator');
var utils = require('../../utils/utils.js');

module.exports = yeoman.generators.NamedBase.extend({

  initializing: function (args, options) {

    this.currentFolder = args;
    this.nameNewFile = options;

    this.moduleName = utils.checkModule(this.nameNewFile);
    this.serviceName = utils.serviceName(this.moduleName);
    this.configName = utils.configName(this.moduleName);
    this.moduleFolder = utils.moduleFolder(this.currentFolder);

    this.log('You called the iac:controller subgenerator.');

    this.controllerName = utils.controllerName(this.moduleName);
    this.fileName = utils.fileName(this.controllerName);
  },

  writing: function () {
    // create controller with snake-case file name
    var folder = 'app/' + this.currentFolder + '/';
    this.template('_controller.js', folder + this.fileName + '.js');
    // create karma test file
    var testFolder = 'test/karma/' + this.moduleFolder + '/';
    this.template('_controller.spec.js', testFolder + this.fileName + '.spec.js');
  }
});
