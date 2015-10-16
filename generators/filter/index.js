'use strict';
var yeoman = require('yeoman-generator');
var utils = require('../../utils/utils.js');

module.exports = yeoman.generators.NamedBase.extend({
  initializing: function (args, option) {

    this.currentFolder = args;
    this.nameNewFile = option;

    this.moduleName =  utils.checkModule('main');
    this.moduleFolder = utils.moduleFolder(this.moduleName);

    this.log('You called the iac:filter subgenerator.');

    this.filterName = this.nameNewFile;
    this.fileName = utils.fileName(this.filterName);
  },

  writing: function () {
    // create filter with snake-case file name
    var folder = 'app/' + this.currentFolder + '/';
    this.template('_filter.js', folder + this.fileName + '-filter.js');
    // create karma test file
    var testFolder = 'test/karma/' + this.currentFolder + '/';
    this.template('_filter.spec.js', testFolder + this.fileName + '-filter.spec.js');
  }
});
