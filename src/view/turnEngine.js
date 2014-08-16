define(function (require) {
  var Backbone  = require('backbone'),
      _         = require('underscore'),
      Player    = require('model/player'),
      PlayerView = require('view/playerView'),
      PlayerTurn    = require('model/playerTurn');
  
  return Backbone.View.extend({
    initialize: function(options){
      this.board = options.board;
      this.boardView = options.boardView;
      
      this.players = options.players;
      this.currentPlayerIndex = 0;
    },

    nextTurn: function(){
      var player = this.getNextPlayer();
      var dieRoll = Math.floor(Math.random()*6);
      var piece = player.getPieceForDieRoll(dieRoll);
      var startCoords = this.board.getPieceCoords(piece);
      if(!startCoords){
        if(_.find(player.get('pieces'), _.bind(function(piece){
          return this.board.getPieceSpace(piece);
        }, this))){
          console.log('player ' + piece.get('team') + ' has rolled a ' + dieRoll + ' and her ' + piece.get('species') + 'is being returne to the board');
          this.board.get('spaces')[0][this.board.rowCount() / 2].set('piece', piece);
          this.nextTurn();
        } else {

          alert("Game Over");
          return;
        }

      }

      console.log('NEXT TURN STARTING', startCoords);

      var startSpace = this.board.getPieceSpace(piece);
      //TODO: human should move one space at a time.
      var playerTurn = new PlayerTurn({
        pathLength: dieRoll, 
        piece: piece,
        startCoords: startCoords,
        startSpace: startSpace,
        validMoves: this.board.coordsWithValidPath(startCoords, dieRoll + 1, piece),
        completeCallback: _.bind(this.nextTurn, this)
      });
      

      var playerView = new PlayerView({
        model:player,
        board: this.board
      });
      playerView.takeTurn(playerTurn);

      this.boardView.render();
    },

    getNextPlayer: function(){
      this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
      return this.players[this.currentPlayerIndex];
    }
  });
});