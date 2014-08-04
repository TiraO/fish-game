define(function (require) {
  var Board = require('model/board'),
      Backbone  = require('backbone');
  
  describe("Board", function(){
    var board;
    beforeEach(function(){
       board = new Board({
          size: 4,
          center: {
            x: 1000,
            y: 1000
          }
        });
    });
    
    describe("#adjacentCoords", function(){
      var startLoc;
      beforeEach(function(){
        startLoc = {xFromCenter:0, yFromTop:2};
      });
      
      it("should return a list of the coordinates for spaces next to the starting coordinates", function(){
        var coordList = board.adjacentCoords(startLoc);
        expect(coordList.length).toEqual(3);
        expect(coordList).toContain({xFromCenter:1, yFromTop:2});
        expect(coordList).toContain({xFromCenter:0, yFromTop:1});
        expect(coordList).toContain({xFromCenter:0, yFromTop:3});
      });
    });
    
    describe("#coordsAtDistance", function(){
       var startLoc;
      beforeEach(function(){
        startLoc = {xFromCenter:0, yFromTop:2};
      });
      
      describe("at distance 2", function(){
        it("should return six locations", function(){
          
          var result = board.coordsAtDistance(startLoc, 2);
          expect(result.length).toEqual(6);        
        });  
      });
      
      describe("at distance 3", function(){
         it("should return nine locations", function(){
          
          var result = board.coordsAtDistance(startLoc, 3);
          expect(result.length).toEqual(9);        
        }); 
      });
    });
  });
});