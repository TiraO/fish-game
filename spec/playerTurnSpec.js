define(function (require) {
  var PlayerTurn = require('model/playerTurn'),
      Space      = require('model/space'),
      _          = require("underscore");
  
  describe("PlayerTurn", function(){
    var playerTurn;
    beforeEach(function(){
      playerTurn = new PlayerTurn({
      });
    });
    
    describe('#complete', function(){
      var piece, startSpace, endSpace;
      beforeEach(function(){
        piece = { something: "something"};
        startSpace = new Space({
          piece: piece
        });
        endSpace = new Space();

        playerTurn.set('startSpace', startSpace);
        playerTurn.set('endSpace', endSpace);
        playerTurn.set('piece', piece);

      });

      it("should move the piece from the start space to the end space", function(){
        playerTurn.complete();
        expect(startSpace.get('piece')).toBeFalsy();
        expect(endSpace.get('piece')).toBe(piece);
      });

      it("should call the turn completion callback", function(){
        var completeSpy = jasmine.createSpy();
        playerTurn.set('completeCallback', completeSpy);
        playerTurn.complete();
        expect(completeSpy).toHaveBeenCalled();
      });
    });
  });
});