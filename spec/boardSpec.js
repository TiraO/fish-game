define(function (require) {
  var Board = require('model/board2'),
      Piece = require('model/piece'),
      Backbone  = require('backbone');
  
  describe("Board", function(){
    var board;
    beforeEach(function(){
       board = new Board({
          sideSize: 4,
          center: {
            x: 1000,
            y: 1000
          }
        });
    });
    
    describe("#rowCount", function(){
      it("should return twice the sideSize", function(){
        expect(board.rowCount()).toBe(8);
      });
    });

    describe("#getPieceCoords", function(){
      var piece;
      beforeEach(function(){
        piece = new Piece({species: 'Banana'});
        board.get('spaces')[1][2].set('piece', piece);
      });

      it("should return the coordinates of the piece", function(){
        var coords = board.getPieceCoords(piece);
        expect(coords.xFromCenter).toBe(1);
        expect(coords.yFromTop).toBe(2);
      });
    });

    describe("#getPieceSpace", function(){
      var piece;
      beforeEach(function(){
        piece = new Piece({species: 'Banana'});
        board.get('spaces')[1][2].set('piece', piece);
      });

      it("should return the space with the piece", function(){
        var space = board.getPieceSpace(piece);
        expect(space).toBe(board.get('spaces')[1][2]);
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
        expect(coordList).toContain({xFromCenter:-1, yFromTop:2});
        expect(coordList).toContain({xFromCenter:1, yFromTop:2});
        expect(coordList).toContain({xFromCenter:0, yFromTop:3});
      });

      describe("when the board size is odd", function(){
        beforeEach(function(){
          board.set('sideSize', 1);
        });

        it("the top center tile is adjacent to the tile above it", function(){
          var startLoc = {
            xFromCenter: 0,
            yFromTop: 0
          };

          var coordList = board.adjacentCoords(startLoc);
          expect(coordList.length).toEqual(3);
          expect(coordList).toContain({xFromCenter:-1, yFromTop:0});
          expect(coordList).toContain({xFromCenter:1, yFromTop:0});
          expect(coordList).toContain({xFromCenter:0, yFromTop:-1});
      
        });
      });
      it("should list the adjacent coordinates when the tile points down.", function(){
        var startLoc = {
          xFromCenter: 0,
          yFromTop: 3
        };

        var coordList = board.adjacentCoords(startLoc);
        expect(coordList.length).toEqual(3);
        expect(coordList).toContain({xFromCenter:-1, yFromTop:3});
        expect(coordList).toContain({xFromCenter:1, yFromTop:3});
        expect(coordList).toContain({xFromCenter:0, yFromTop:2});
      
       var startLoc = {
          xFromCenter: 0,
          yFromTop: 0
        };

        var coordList = board.adjacentCoords(startLoc);
        expect(coordList.length).toEqual(3);
        expect(coordList).toContain({xFromCenter:-1, yFromTop:0});
        expect(coordList).toContain({xFromCenter:1, yFromTop:0});
        expect(coordList).toContain({xFromCenter:0, yFromTop:1});
      });
    });
    
    describe("#maxDistance", function(){
      it("returns the distance between the two furthest tiles", function(){
        board.set("size", 3);
        expect(board.maxDistance()).toEqual(11);
        board.set("size", 2);
        expect(board.maxDistance()).toEqual(7);
      });
    });

    describe("#coordsWithValidPath", function(){
      var pathLength, piece, startCoords;
      describe("for path length of 1", function(){
        beforeEach(function(){
          pathLength = 1;
          piece = new Piece({species:'Shark'});
          var ediblePiece = new Piece({species: 'Guppy', team:'Oppo-Sing'});
          board.place(ediblePiece, {xFromCenter: -1, yFromTop:0});
          board.set('sideSize', 1);
          startCoords = {xFromCenter: 0, yFromTop: 0};
        });

        it("should exclude coordinates that are outside of the board", function(){
          var coords = board.coordsWithValidPath(startCoords, pathLength, piece);
          expect(coords.length).toBe(2);
          expect(coordList).toContain({xFromCenter:-1, yFromTop:0});
          expect(coordList).toContain({xFromCenter:1, yFromTop:0});
        });
        
        it("should exclude coordinates with pieces that the target cannot eat", function(){
          piece.set('species', 'Plankton');
          var coords = board.coordsWithValidPath(startCoords, pathLength, piece);
          expect(coords.length).toBe(1);
          expect(coordList).toContain({xFromCenter:1, yFromTop:0});
        });

        it("should exclude coordinates with pieces of the same team", function(){
          piece.set('team', 'Oppo-Sing');
          var coords = board.coordsWithValidPath(startCoords, pathLength, piece);
          expect(coords.length).toBe(1);
          expect(coordList).toContain({xFromCenter:1, yFromTop:0});
        });
      });
      
    })
    
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