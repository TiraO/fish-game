define(function (require) {
  Backbone  = require('backbone');
  
  return Backbone.View.extend({
    initialize: function(options){
      this.paperSet = options.paperSet;
      this.paper = options.paper;
    },
    
    render: function(){
      this.paperSet.push(this.paper.circle(100, 100, 100).attr({"fill":"#F00"}));
    }
  });
});