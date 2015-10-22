'use strict'
angular.module('<%= moduleName %>', [
  'ionic'
  'ngCordova'
  'ui.router'
]).config ($stateProvider<% if (options.mainModule) {%>, $urlRouterProvider<%} %>) ->
  # ROUTING with ui.router
  <% if (options.mainModule && answers.template === 'blank') { -%>
    $urlRouterProvider.otherwise '/<%= moduleFolder %>'
  <%} else if (options.mainModule) { -%>
    $urlRouterProvider.otherwise '/<%= moduleFolder %>/list'
  <%} -%>

  $stateProvider.state '<%= moduleName %>', ->
    url: '/<%= moduleFolder %>'
<% if (answers.template === 'blank') { -%>
    template: '<ion-view view-title="<%= moduleName %>"></ion-view>'
  <%} else if (answers.template === 'sidemenu') { -%>
    abstract: true
    templateUrl: 'templates/menu.html'
    controller: '<%= menuCtrlName %> as menu')

  .state '<%= moduleName %>.list', ->
    url: '/list'
    views: 'pageContent': templateUrl: 'templates/list.html')
  .state '<%= moduleName %>.listDetail', ->
    url: '/list/detail'
    views: 'pageContent': templateUrl: 'templates/list-detail.html')
  .state '<%= moduleName %>.debug', ->
    url: '/debug'
    views: 'pageContent':
      templateUrl: 'templates/debug.html'
      controller: '<%= debugCtrlName %> as ctrl'
  <%} else if (answers.template === 'tabs') { -%>
    abstract: true
    templateUrl: 'templates/tabs.html')
  .state '<%= moduleName %>.list', ->
    url: '/list'
    views: 'tab-list':
      templateUrl: 'templates/list.html')
  .state '<%= moduleName %>.listDetail', ->
    url: '/list/detail'
    views: 'tab-list':
      templateUrl: 'templates/list-detail.html')
  .state '<%= moduleName %>.debug', ->
    url: '/debug'
    views: 'tab-debug':
      templateUrl: 'templates/debug.html'
      controller: '<%= debugCtrlName %> as ctrl'
  <% } -%>
