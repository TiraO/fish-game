define(function (require) {
  var Board = require('model/board'),
      Backbone  = require('backbone');
  
  describe("Board", function(){
    var board;
    describe("#coordsAtDistance", function(){
      var startLoc;
      beforeEach(function(){
        board = new Board({
          size: 4,
          center: {
            x: 1000,
            y: 1000
          }
        });
        
        startLoc = {xFromCenter:0, yFromTop:2};
      });
      
      it("should return a list of the coordinates for spaces at that distance from the starting coordinates", function(){
        var coordList = board.coordsAtDistance(startLoc, 1);
        expect(coordList.length).toEqual(3);
        expect(coordList).toContain({xFromCenter:1, yFromTop:2});
      });
    });
  });
});