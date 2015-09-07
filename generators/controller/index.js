'use strict';
var yeoman = require('yeoman-generator');
var utils = require('../../utils/utils.js');

var MGenerator = yeoman.generators.NamedBase.extend({

  initializing: function () {
    this.argument('module', { type: String, required: false });
    this.moduleName = utils.checkModule(this.module);
    this.serviceName = utils.serviceName(this.moduleName);
    this.configName = utils.configName(this.moduleName);
    this.moduleFolder = utils.moduleFolder(this.moduleName);

    this.log('You called the m:controller subgenerator.');

    this.controllerName = utils.controllerName(this.name);
    this.fileName = utils.fileName(this.controllerName);
  },

  writing: function () {
    // create controller with snake-case file name
    var folder = 'app/' + this.moduleFolder + '/controllers/';
    this.template('_controller.js', folder + this.fileName + '.js');
    // create karma test file
    var testFolder = 'test/karma/' + this.moduleFolder + '/';
    this.template('_controller.spec.js', testFolder + this.fileName + '.spec.js');
  }
});

module.exports = MGenerator;