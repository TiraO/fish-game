define(function (require) {
  Backbone  = require('backbone'),
  PieceView = require('view/pieceView');
  
  return Backbone.View.extend({
    initialize: function(options){
      this.paperSet = options.paperSet;
      this.paper = options.paper;
      options.paperSet = this.paper.set();
      this.paperSet.push(options.paperSet);
      
      this.pieceView = options.pieceView || new PieceView(
        options
      );
      this.screenCoord = options.screenCoord;
    },
    
    render: function(){
      this.paperSet.remove();
      var rect = this.paper.rect(this.screenCoord.x,this.screenCoord.y,10,10).attr({ fill:"#FAA"});
      if(this.model.clickCallback){
        rect.attr({fill:"#030"});
      }

      this.paperSet.push(rect);
      rect.click(_.bind(function(){
        console.log('seeking callback for space', this.model.attributes);
        if(this.model.clickCallback){
          console.log('and there was a callback');
          this.model.clickCallback(this.model);
        }
      }, this));

      if(this.model.get('piece')){
        var piece = this.model.get('piece');
        this.pieceView.model = piece;
        this.pieceView.render();
      }
    }
  });
});