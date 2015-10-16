'use strict';
var yeoman = require('yeoman-generator');
var utils = require('../../utils/utils.js');

module.exports = yeoman.generators.NamedBase.extend({

  initializing: function (args, options) {

    this.currentFolder = args;
    this.nameNewFile = options + 'Factory';

    this.moduleName =  utils.checkModule('main');
    this.moduleFolder = utils.moduleFolder(this.currentFolder);

    this.log('You called the iac:service subgenerator.');

    this.serviceName = utils.serviceName(this.nameNewFile);
    this.fileName = utils.fileName(options);
  },

  writing: function () {
    // create service with snake-case file name
    var folder = 'app/' + this.moduleFolder + '/';
    this.template('_service.js', folder + this.fileName + '-service.js');
    // create karma test file
    var testFolder = 'test/karma/' + this.moduleFolder + '/';
    this.template('_service.spec.js', testFolder + this.fileName + '-service.spec.js');
  }
});
