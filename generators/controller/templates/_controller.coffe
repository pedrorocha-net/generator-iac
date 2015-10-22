do ->

  <%= controllerName %> = ($log<% if(options.template === 'debug') { %>, <%= serviceName %>, <%= configName %><% } %>) ->
    $log.log 'Hello from your Controller: <%= controllerName %> in module <%= moduleName%>:. This is your controller:', this
    <% if (options.template === 'debug') {-%>
    # bind data from services
    @someData = <%= serviceName %>.someData
    @ENV = <%= configName %>.ENV
    @BUILD = <%= configName %>.BUILD
    # PASSWORD EXAMPLE
    @password =
      input: ''
      strength: ''

    @grade = ->
      size = @password.input.length
      if size > 8
        @password.strength = 'strong'
      else if size > 3
        @password.strength = 'medium'
      else
        @password.strength = 'weak'
      return

    @grade()
    <% } -%>
    return

  'use strict'
  angular.module('<%= moduleName %>').controller '<%= controllerName %>', <%= controllerName %>
  return
