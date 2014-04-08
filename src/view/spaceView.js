define(function (require) {
  Backbone  = require('backbone');
  
  return Backbone.View.extend({
    initialize: function(options){
      this.pieceView = options.pieceView;
    },
    
    render: function(){
      this.pieceView.render();
    }
  });
});