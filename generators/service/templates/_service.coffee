
'use strict'
angular.module('<%= moduleName %>').factory '<%= serviceName %>', <%= serviceName %>

<%= serviceName %> = ($log) ->
  $log.log 'Hello from your Service: <%= serviceName %> in module <%= moduleName %>'

  <% if(options.template === 'debug') { -%>

    # some initial data
    @someData = binding: 'Yes! Got that databinding working'

    @changeBriefly = ->
      initialValue = @someData.binding
      @someData.binding = 'Yeah this was changed'
      that = this
      $timeout (->
        that.someData.binding = initialValue
        return
      ), 500

   <% } -%>
