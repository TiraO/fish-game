define(function (require) {
  var 
  _           = require('underscore'),
  Backbone    = require('backbone');


  var cached = {
    center: undefined,
    radius: undefined
  };

  var equilateralTriangleHeight = Math.sqrt(3)/2.0;

  return Backbone.Model.extend({

    size: function(){
      return this.get('size');
    },

    center: function(){
      return this.get('center');
    },

    radius: function(){
      var center = this.center();
      if(center == cached.center){
        return cached.radius;
      } else {
        cached.radius = Math.min(center.x,center.y)*0.9;
        return cached.radius;
      }
    },

    getWidthAt: function(yFromTop){
      var section = Math.floor(yFromTop/this.size());
      var depthInSection = yFromTop%this.size();
      if(section == 1 || section ==2){
        return 2*this.size();
      }

      if(section == 3){
        depthInSection = this.size() -depthInSection;
      }

      return depthInSection*2;
    },

    maxXAt: function(yFromTop){
      return this.getWidthAt(yFromTop)/2;
    },

    minXAt: function(yFromTop){
      return -1*this.getWidthAt(yFromTop)/2;
    },

    rowCount: function(){
      return 4*this.size();
    },

    columnCount: function(){
      return this.size()*2;
    },

    rowHeight: function(){
      return 2.0*this.radius()/this.rowCount();
    },

    columnWidth: function(){
      return equilateralTriangleHeight*this.radius()/this.columnCount();
    },

    tilePointsLeft: function(xFromCenter, yFromTop){
      if(((1+ Math.abs(xFromCenter))%2 + Math.abs(yFromTop)%2)%2 ==1 ){
        return true;
      }
      return false;
    },

    getTileCoordinates: function(screenCoordinates){
      var boardX = 0.5*(screenCoordinates.x - this.center().x)/this.columnWidth();
      var yTop = this.center().y - (this.rowHeight() * this.rowCount() /2);
      var boardY = (screenCoordinates.y - yTop) / this.rowHeight();
      var slope;
      var offset = 0;
      if(this.tilePointsLeft(Math.floor(boardX), Math.floor(boardY))){
        slope = 1;
      } else {
        slope = -1;
        offset = 1;
      }
      var tileX = boardX - Math.floor(boardX);
      var tileY = boardY - Math.floor(boardY);

      if(tileY > slope*tileX + offset){
        boardY = Math.floor(boardY) + 1;
      } else {
        boardY = Math.floor(boardY);
      }
      boardX = Math.floor(boardX);

      var result = {};
      result.x = boardX;
      result.y = boardY;
      return result;
    },

    getScreenCoordinates: function(xFromCenter, yFromTop){
      var xFudge = (2*this.columnWidth()/3)*( this.tilePointsLeft(xFromCenter,yFromTop)+ 2.5);
      var yTop = this.center().y-(this.rowCount()/2.0)*this.rowHeight();

      return {
        x: (xFromCenter -0.5)*2*this.columnWidth() + this.center().x + xFudge,
        y: yTop + yFromTop*this.rowHeight()
      };
    },
    
    adjacentCoords: function(startCoords) {
      var above = {xFromCenter:startCoords.xFromCenter, yFromTop:startCoords.yFromTop - 1};
        var below = {xFromCenter:startCoords.xFromCenter, yFromTop:startCoords.yFromTop + 1};
        var left = {xFromCenter:startCoords.xFromCenter -1, yFromTop:startCoords.yFromTop};
        var right = {xFromCenter:startCoords.xFromCenter +1, yFromTop:startCoords.yFromTop};
        
        if(this.tilePointsLeft(startCoords.xFromCenter, startCoords.yFromTop)){
          return [above, below, right];
        } else {
          return [above, below, left];
        }
    },
    
    maxDistance: function(){
      //should probably bump this up to include caves.
      return this.size()*4 -1;  
    },

    coordsWithValidPath: function(startCoords, pathLength, piece){
      if(distance > this.maxDistance()){
        return [];
      }
    
      var atDistance = {};
      atDistance[0] = [startCoords];
      
      var board = this;
      var dist = 1;
      var collectCoords = function(dist){
        atDistance[dist] = [];
        _.each(atDistance[dist - 1], function(coords){
          var nextMaybes = board.adjacentCoords(coords);
          var yeses =  _.filter(nextMaybes, function(maybe){
            var space = this.getSpace(maybe);
            return (space.isEmpty() || piece.canDevour(space.getPiece())) && !_.findWhere(atDistance[dist], maybe);
          });
          
          atDistance[dist] = atDistance[dist].concat(yeses);
        });
      }
      
      do{
        collectCoords(dist);
        dist ++;
      } while (dist <= distance && dist < this.maxDistance());
      
      return atDistance[distance];
    },
    
    coordsAtDistance: function(startCoords, distance){
      if(distance > this.maxDistance()){
        return [];
      }
      
      if(distance == 1){
          return this.adjacentCoords(startCoords);
      } else {
        var atDistance = {};
        atDistance[0] = [startCoords];
        
        var board = this;
        var dist = 1;
        var collectCoords = function(dist){
          atDistance[dist] = [];
          _.each(atDistance[dist - 1], function(coords){
            var nextMaybes = board.adjacentCoords(coords);
            var yeses =  _.filter(nextMaybes, function(maybe){
              return !_.findWhere(atDistance[dist - 2], maybe) && !_.findWhere(atDistance[dist], maybe);
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
    }
  });
});