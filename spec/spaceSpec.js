define(function (require) {
  var Space      = require('model/space'),
      _          = require("underscore");
  
  describe("Space", function(){
    var space;
    beforeEach(function(){
      space = new Space();
    });
    
    describe('#remove', function(){
      var piece;
      beforeEach(function(){
        piece = { something: "something"};
        space.set('piece', piece);
      });

      it("should remove the piece from the space", function(){
        space.remove(piece);
        expect(space.get('piece')).toBeFalsy();
      });
    });

    describe('#add', function(){
      var piece;
      beforeEach(function(){
        piece = { something: "something"};
      });

      it("should add the piece to the space", function(){
        space.add(piece);
        expect(space.get('piece')).toBe(piece);
      });
    });
  });
});