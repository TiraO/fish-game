define(function (require) {
  var PieceView = require('view/pieceView'),
      _ = require("underscore")
      Raphael = require('raphael');
  
  describe("PieceView", function(){
    var pieceView, paper, paperSet;
    beforeEach(function(){
      paper = new Raphael(document.body, "100%", "100%");
      paperSet = paper.set();
      pieceView = new PieceView({paperSet: paperSet, paper:paper});  
    });
    
    describe('#render', function(){
     it("should add something to it display set", function(){
       pieceView.render();
       expect(_.size(paperSet)).not.toEqual(0);
     });
    });
  });
});