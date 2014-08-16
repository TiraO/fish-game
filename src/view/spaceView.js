define(function (require) {
  Backbone  = require('backbone'),
  PieceView = require('view/pieceView');
  
  return Backbone.View.extend({
    initialize: function(options){
      this.paperSet = options.paperSet;
      this.paper = options.paper;
      // this.childPaperSet = this.paper.set();
      // this.paperSet.push(this.childPaperSet);
      // options.paperSet = this.childPaperSet;
      this.pieceView = options.pieceView || new PieceView(
        options
      );
      this.screenCoord = options.screenCoord;
    },
    
    render: function(){
      this.paperSet.remove();
      var width = 25;
      var height = 25;
     

     
     
      if(this.model.get('piece')){
        var piece = this.model.get('piece');
        this.pieceView.model = piece;
        this.pieceView.render();
      }

      var rect = this.paper.rect(this.screenCoord.x -width/2,this.screenCoord.y -height/2,width, height)
        .attr({ 'fill-opacity':"0.3", 'stroke-width':0});
      if(this.model.clickCallback){
        rect.attr({fill:"#030"});
      }
      console.log('recta');
      this.paperSet.push(rect);
     // this.paperSet.push(this.childPaperSet);

      rect.click(_.bind(function(){
        console.log('seeking callback for space', this.model.attributes);
        if(this.model.clickCallback){
          console.log('and there was a callback');
          this.model.clickCallback(this.model);
        }
      }, this));

    }
  });
});