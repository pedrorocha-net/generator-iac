'use strict'

<%= controllerName %> = () ->
  console.log 'Hello from your Controller: <%= controllerName %> in module <%= moduleName%>:. This is your controller:', this
  <% if (options.template === 'debug') {-%>
  # bind data from services
  @someData = ''
  @ENV = ''
  @BUILD = ''
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

  @grade()
  return
  <% } -%>

angular.module('<%= moduleName %>').controller '<%= controllerName %>', <%= controllerName %>
