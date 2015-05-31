define(function (require) {
  var 
  _           = require('underscore'),
  Backbone    = require('backbone');

  return Backbone.Model.extend({
    defaults: function(){
      return {
        isValidMoveForSelectedPiece: false,
        piece: null,
        boardCoord: null,
        screenCoord: null,
        isCoral: false
      };
    },

    remove: function(){
      this.set('piece', null);
    },

    add: function(piece){
      this.set('piece', piece);
    },

    click: function(clickCallback){
      console.log('setting click callback for space', this.get('boardCoord'), this.attributes);
      console.log('attr', this.attributes);
      this.clickCallback = clickCallback;
    },

    isEmpty: function(){
      return !this.get('piece');
    },

    getPiece: function(){
      return this.get('piece');
    }
  });
});