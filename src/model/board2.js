define(function (require) {
  var 
  _           = require('underscore'),
  Backbone    = require('backbone'),
  Space       = require('model/space'),
  Piece       = require('model/piece');

  return Backbone.Model.extend({
  	var equilateralTriangleHeightRatio = Math.sqrt(3)/2.0;

    size: function(){
      return this.get('size');
    },

  	maxXAt: function(yFromTop){
  		return yFromTop < sideSize? 
  			sideSize + yFromTop :
  			sideSize + yFromTop - (yFromTop - sideSize);
  	},

  	minXAt: function(yFromTop){
  		return -1*this.maxXAt(yFromTop);
  	},
	
	tilePointsUp: function(xFromCenter, yFromTop){
		
	},

	getScreenCoordinates: function(xFromCenter, yFromTop, triangleSideLength){
		//todo: something something tilePointsUp
      return {
        x: (xFromCenter)*triangleSideLength + this.center().x,
        y: yTop + yFromTop*triangleSideLength*equilateralTriangleHeightRatio;
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
    }
  });
});