define(function (require) {
  var 
  _           = require('underscore'),
  Backbone    = require('backbone');

  return Backbone.Model.extend({
    defaults: function(){
      return {
        isValidMoveForSelectedPiece: false,
        piece: null,
        screenCoord: null
      };
    },

    remove: function(){
      this.set('piece', null);
    },

    add: function(piece){
      this.set('piece', piece);
    }
  });
});