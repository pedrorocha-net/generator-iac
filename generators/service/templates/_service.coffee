
'use strict'

<%= serviceName %> = (<% if(options.template === 'debug') { -%>$timeout<% } -%>) ->
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

  return {
    changeBriefly: this.changeBriefly
    someData: this.someData
  }
   <% } -%>

angular.module('<%= moduleName %>').factory '<%= serviceName %>', <%= serviceName %>

