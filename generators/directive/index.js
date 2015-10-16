// 'use strict';
var yeoman = require('yeoman-generator');
var utils = require('../../utils/utils.js');

module.exports = yeoman.generators.NamedBase.extend({
  initializing: function (args) {

    this.nameNewFile = args;

    this.moduleName =  utils.checkModule('main');
    this.moduleFolder = utils.moduleFolder(this.moduleName);

    this.log('You called the m-ionic:directive subgenerator.');

    this.directiveName = this.nameNewFile;
    this.directiveTagName = utils.directiveTagName(this.directiveName);
    this.fileName = utils.fileName(this.directiveName);
  },

  writing: function () {
    // create directive with snake-case file name
    var folder = 'app/widgets/';
    this.template('_directive.js', folder + this.fileName + '-directive.js');
    // create karma test file
    var testFolder = 'test/karma/widgets/';
    this.template('_directive.spec.js', testFolder + this.fileName + '-directive.spec.js');
  }
});
