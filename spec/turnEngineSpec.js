define(function (require) {
  var TurnEngine = require('view/turnEngine'),
      Board = require('model/board'),
      Piece = require('model/piece'),
      Player = require('model/player');
  
  describe("Turn Engine", function(){
    var turnEngine, board;
    beforeEach(function(){
      board = new Board();
      turnEngine = new TurnEngine({
        board: board,
        players: [new Player()]
      });
    });

    describe("#nextTurn", function(){
      describe("when the player has no pieces on the board", function(){
        it("should alert that the player lost", function(){
          spyOn(window, 'alert');
          turnEngine.nextTurn();
          expect(window.alert).toHaveBeenCalledWith("Game Over");
        });
      });
    });
  });
});