'use strict';
var yeoman = require('yeoman-generator');
var utils = require('../../utils/utils.js');

module.exports = yeoman.generators.NamedBase.extend({
  initializing: function () {
    this.argument('module', { type: String, required: false });
    this.moduleName =  utils.checkModule(this.module);

    this.log('You called the iac:constant subgenerator.');

    this.constantName = this.name;
    this.fileName = utils.fileName(this.constantName);
  },

  writing: function () {
    // create constant with snake-case file name
    var folder = 'app/common/';
    this.template('_constant.js', folder + this.fileName + '-constant.js');
  }
});
