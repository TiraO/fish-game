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
      console.log(this.paperSet);
      this.paperSet.remove();
      if(this.model.get('piece')){
        var piece = this.model.get('piece');
        // console.log(piece.attributes);
        // pieceView = new PieceView({model:piece, screenCoord:this.model.get('screenCoord'), paperSet: this.paperSet, paper: this.paper});
        this.pieceView.model = piece;
        this.pieceView.render();
      }
    }
  });
});