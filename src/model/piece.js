define(function (require) {
  var 
  _           = require('underscore'),
  Backbone    = require('backbone');

  return Backbone.Model.extend({
    speciesTypes: {
       'Shark':{ moves: [4, 5], strength: 3},
       'Flounder':{ moves: [3], strength: 2},
       'Guppy':{ moves: [2], strength: 2}, 
       'Clown Fish':{ moves: [1], strength: 2},
       'Plankton':{ moves: [0], strength: 1}
    },

    defaults: function(){
      return {
        species: 'Guppy',
        isSelected: false,
        team: 'local'
      };
    },

    canDevour: function(otherPiece){
        return this.get('team') != otherPiece.get('team') && 
          this.speciesTypes[this.get('species')].strength >= this.speciesTypes[otherPiece.get('species')].strength;
    },

    getMoves: function(){
      return this.speciesTypes[this.get('species')]["moves"];
    }
  });
});