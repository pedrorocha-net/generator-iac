'use strict'
angular.module('<%= moduleName %>').filter '<%= filterName %>', <%= filterName %>

<%= filterName %> = ->
  (input) ->
    '<%= filterName %> filter: ' + input
