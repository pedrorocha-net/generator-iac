'use strict';
var yeoman = require('yeoman-generator');
var utils = require('../../utils/utils.js');

module.exports = yeoman.generators.Base.extend({
  initializing: function (args, options) {

    this.currentFolder = args;
    this.nameNewFile = options;

    this.moduleName = utils.checkModule('main');

    this.name = this.nameNewFile;
    this.log('You called the iac:pair subgenerator with the argument ' + this.name + '.');
  },

  writing: function () {
    this.composeWith('iac:controller', {
      arguments: [this.currentFolder, this.name],
    });
    this.composeWith('iac:template', {
      arguments: this.name
    });
  }
});
