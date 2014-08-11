define(function (require) {
  Backbone  = require('backbone')
  _         = require('underscore');
  Player    = require('model/player');
  PlayerTurn    = require('model/playerTurn');
  
  return Backbone.View.extend({
    initialize: function(options){
      var player = new Player();
      this.players = [player];
      this.currentPlayerIndex = 0;
    },

    nextTurn: function(){
      var player = this.getNextPlayer();
      var dieRoll = Math.floor(Math.random()*6);
      var piece = player.getPieceForDieRoll(dieRoll);
      var startCoords = this.board.getPieceCoords(piece);
      var startSpace = this.board.getSpace(startCoords);
      //TODO: human should move one space at a time.
      var playerTurn = new PlayerTurn({
        pathLength: dieRoll, 
        piece: piece,
        startCoords: startCoords,
        startSpace: startSpace,
        validMoves: this.board.coordsWithValidPath(startCoords, dieRoll, piece),
        completeCallback: _.bind(this.nextTurn, this)
      });

      player.takeTurn(playerTurn);
    },

    getNextPlayer: function(){
      this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
      return this.players[this.currentPlayerIndex];
    }

  });
});