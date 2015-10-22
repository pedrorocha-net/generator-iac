do ->
  'use strict'
  angular.module('<%= moduleName %>').directive '<%= directiveName %>', ->
    {
      template: '<div></div>'
      restrict: 'E'
      link: (scope, element, attrs) ->
        element.text 'this is the <%= directiveName %> directive', attrs
        return

    }
  return
