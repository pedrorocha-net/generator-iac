'use strict'

<%= filterName %> = ->
  (input) ->
    '<%= filterName %> filter: ' + input

angular.module('<%= moduleName %>').filter '<%= filterName %>', <%= filterName %>
