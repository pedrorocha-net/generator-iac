'use strict';
angular.module('<%= moduleName %>')
.filter('<%= filterName %>', <%= filterName %>);

function <%= filterName %>() {
  return function (input) {
    return '<%= filterName %> filter: ' + input;
  };
};
