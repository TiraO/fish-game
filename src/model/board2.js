define(function (require) {
  var 
  _           = require('underscore'),
  Backbone    = require('backbone'),
  Space       = require('model/space'),
  Piece       = require('model/piece');
var equilateralTriangleHeightRatio = Math.sqrt(3)/2.0;

  return Backbone.Model.extend({
    defaults: function(){
      return {
        sideSize: 4,
        center: {x: 500, y: 500}
      };
    },
    initialize: function(){
      this.initializeSpaces();
    },
    initializeSpaces: function(){
      var spaces = [];
      var spaceHash = {};
      var y;
      for(y = 0; y< this.rowCount(); y++){
        var x;
        for(x = this.minXAt(y); x < this.maxXAt(y); x ++){
          var space = new Space({
            screenCoord: this.getScreenCoordinates(x,y),
            boardCoord: {x:x, y:y}
          });
          
          spaces.push(space);
          spaceHash[x] = spaceHash[x] || {};
          spaceHash[x][y] = space;
        }
      }

      this.set('spaces', spaceHash);
    },
    center: function(){
      return this.get('center');
    },
    size: function(){
      return this.get('sideSize');
    },
    place: function(piece, coords){
      //todo: testme
      //todo: prevent piece duplication?
      this.get('spaces')[coords.xFromCenter][coords.yFromTop] = piece;
    },
    rowCount: function(){
      return this.get('sideSize')*2;
    },

    maxXAt: function(yFromTop){
      var sideSize = this.get('sideSize');
      return yFromTop < sideSize? 
        sideSize + yFromTop :
        sideSize + yFromTop - (yFromTop - sideSize);
    },

    minXAt: function(yFromTop){
      return -1*this.maxXAt(yFromTop);
    },
  
    tilePointsUp: function(xFromCenter, yFromTop){
      return (xFromCenter + yFromTop + this.get('sideSize') + 1)%2 ;
    },

   
    getPieceCoords: function(piece){
      var pieceSpace = this.getPieceSpace(piece);

      if(pieceSpace){
        var pieceCoords = pieceSpace.get('boardCoord');
        if(pieceCoords){
          var coords = {
            xFromCenter: pieceCoords.x,
            yFromTop: pieceCoords.y
          }
          return coords;
        }
      }
    },

    getPieceSpace: function(piece){
      if(piece){
        var pieceSpace;
        _.find(this.get('spaces'), function forColumn(column, x){
          return _.find(column, function andRow(space, y){
            if(space.get('piece') == piece){
              pieceSpace = space;
              return true;
            }
          });
        });

        return pieceSpace;
      }
    },

    getScreenCoordinates: function(xFromCenter, yFromTop, triangleSideLength){
    //todo: something something tilePointsUp
    var triangleHeight = equilateralTriangleHeightRatio*triangleSideLength;
    var yTop = this.center().y - (this.rowCount()*0.5*triangleHeight);
      return {
        x: (xFromCenter)*triangleSideLength + this.center().x,
        y: yTop + yFromTop*triangleHeight
      };
    },

    adjacentCoords: function(startCoords){
      var above = {xFromCenter:startCoords.xFromCenter, yFromTop:startCoords.yFromTop - 1};
      var below = {xFromCenter:startCoords.xFromCenter, yFromTop:startCoords.yFromTop + 1};
      var left = {xFromCenter:startCoords.xFromCenter -1, yFromTop:startCoords.yFromTop};
      var right = {xFromCenter:startCoords.xFromCenter +1, yFromTop:startCoords.yFromTop};

      if(this.tilePointsUp(startCoords.xFromCenter, startCoords.yFromTop)){
        return [left, right, below];
      } else {
        return [left, right, above];
      }
    }, 
    coordsWithValidPath: function(startCoords, pathLength, piece){
      var distance = pathLength;
      // if(distance > this.maxDistance()){
      //   return [];
      // }
    
      var atDistance = {};
      atDistance[0] = [startCoords];
      
      var board = this;
      var dist = 1;
      var getSpace = _.bind(this.getSpaceAt, this);

      var collectCoords = function(dist){
        atDistance[dist] = [];
        _.each(atDistance[dist - 1], function(coords){
          var nextMaybes = board.adjacentCoords(coords);
          var yeses =  _.filter(nextMaybes, function(maybe){
            var space = getSpace(maybe);
            return space && (space.isEmpty() || piece.canDevour(space.getPiece())) && !_.findWhere(atDistance[dist], maybe);
          });
          
          atDistance[dist] = atDistance[dist].concat(yeses);
        });
      }
      
      do{
        collectCoords(dist);
        dist ++;
      } while (dist <= distance && dist < this.maxDistance());
      
      return atDistance[distance];
    }
  });
});