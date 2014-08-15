define(function (require) {
  Backbone  = require('backbone');
  
  return Backbone.View.extend({
  	initialize: function(options){
  		this.board = options.board;
  	},

  	takeTurn: function(turn){
  		var spaces = this.board.get('spaces');
  		_.each(turn.get('validMoves'), function(validMove){
  			var space = spaces[validMove.xFromCenter][validMove.yFromTop];
  			space.click(function(spaceModel){
          console.log('turn complete');
          turn.set('endSpace', spaceModel);

          _.each(turn.get('validMoves'), function(validMove){
            var space = spaces[validMove.xFromCenter][validMove.yFromTop];
            space.click(null);
          });
        
  				turn.complete();
  			});
  		});
  	}
  });
});