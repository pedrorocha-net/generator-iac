'use strict';

describe('module: <%= moduleName %>, service: <%= serviceName %>', function(){
  // load the service's module
  beforeEach(module('<%= moduleName %>'));
  // load all the templates to prevent unexpected $http requests from ui-router
  // beforeEach(module('ngHtml2Js'));
<% if (options.template !== 'debug') { -%>
  // instantiate service
  var <%= serviceName %>;
  beforeEach(inject(function(_<%= serviceName %>_){
    <%= serviceName %> = _<%= serviceName %>_;
  }));

  it('should do something', function(){
    expect(!!<%= serviceName %>).toBe(true);
  });

<% } else { -%>
  // instantiate service
  var <%= serviceName %>;
  beforeEach(inject(function(_<%= serviceName %>_){
    <%= serviceName %> = _<%= serviceName %>_;
  }));

  describe('.changeBriefly()', function(){
    beforeEach(function(){
      <%= serviceName %>.changeBriefly();
    });
    it('should briefly change', function(){
      expect(<%= serviceName %>.someData.binding).toEqual('Yeah this was changed');
    });
  });

<% } -%>
});
