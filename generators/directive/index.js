// 'use strict';
var yeoman = require('yeoman-generator');
var utils = require('../../utils/utils.js');

module.exports = yeoman.generators.NamedBase.extend({
  initializing: function (args, option) {

    this.currentFolder = args;
    this.nameNewFile = option;

    this.moduleName =  utils.checkModule('main');
    this.moduleFolder = this.currentFolder;

    this.log('You called the iac:directive subgenerator.');

    this.directiveName = this.nameNewFile;
    this.directiveTagName = utils.directiveTagName(this.directiveName);
    this.fileName = utils.fileName(this.directiveName);
  },

  writing: function () {
    // create directive with snake-case file name
    var folder = 'app/' + this.currentFolder + '/';
    this.template('_directive.js', folder + this.fileName + '-directive.js');
    // create karma test file
    var testFolder = 'test/karma/' + this.currentFolder + '/';
    this.template('_directive.spec.js', testFolder + this.fileName + '-directive.spec.js');
  }
});
