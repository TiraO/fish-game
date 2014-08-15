define(function (require) {
  var Piece = require('model/piece');
  
  describe("Piece", function(){
    describe("#canDevour", function(){
      var otherTeam;
      beforeEach(function(){
        otherTeam = {
          guppy: new Piece({species: 'Guppy', team:'Other'})
        }
      });

      describe("a shark", function(){
        var shark;
        beforeEach(function(){
          shark = new Piece({species: 'Shark'});
        });

        it("can devour a guppy", function(){
          expect(shark.canDevour(otherTeam.guppy)).toBe(true);
        });
      });
    });
  });
});