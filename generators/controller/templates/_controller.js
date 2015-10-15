'use strict';
angular.module('<%= moduleName %>')
.controller('<%= controllerName %>', <%= controllerName %>);

function <%= controllerName %>($log<% if(options.template === 'debug') { %>, <%= serviceName %>, <%= configName %><% } %>) {

  $log.log('Hello from your Controller: <%= controllerName %> in module <%= moduleName%>:. This is your controller:', this);

<% if (options.template === 'debug') {-%>
  // bind data from services
  this.someData = <%= serviceName %>.someData;
  this.ENV = <%= configName %>.ENV;
  this.BUILD = <%= configName %>.BUILD;

  // PASSWORD EXAMPLE
  this.password = {
    input: '', // by user
    strength: ''
  };
  this.grade = function () {
    var size = this.password.input.length;
    if (size > 8) {
      this.password.strength = 'strong';
    } else if (size > 3) {
      this.password.strength = 'medium';
    } else {
      this.password.strength = 'weak';
    }
  };
  this.grade();

<% } -%>
};
