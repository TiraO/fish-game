define(function (require) {
  var Player      = require('model/player'),
      _          = require("underscore");
  
  describe("Player", function(){
    var player;
    beforeEach(function(){
      player = new Player();
    });
    
    describe("#getPieceForDieRoll", function(){
      var piece1, piece5_6;
      beforeEach(function() {
        piece1 = new Piece({
          species: "Plankton"
        });
        piece5_6 = new Piece({
          species: "Shark"
        });
        player.set('pieces', [piece1, piece5_6]);
      });

      it("should return the corresponding piece", function(){
        expect(player.getPieceForDieRoll(5)).toBe(piece5_6);
        expect(player.getPieceForDieRoll(4)).toBe(piece5_6);
        expect(player.getPieceForDieRoll(0)).toBe(piece1);
      });
    });
  });
});