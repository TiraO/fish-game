define(function (require) {
  var 
  _           = require('underscore'),
  Backbone    = require('backbone');

  return Backbone.Model.extend({
    defaults: function(){
      return {
        pieces: []
      };
    },

    getPieceForDieRoll: function(roll){
      return _.find(this.get('pieces'), function(piece){
        return _.contains(piece.getMoves(), roll);
      });
    }
  });
});