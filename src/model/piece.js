define(function (require) {
  var 
  _           = require('underscore'),
  Backbone    = require('backbone');

  return Backbone.Model.extend({
    speciesTypes: {
       'Shark':{ moves: [5, 6], strength: 3},
       'Flounder':{ moves: [4], strength: 2},
       'Guppy':{ moves: [3], strength: 2}, 
       'Clown Fish':{ moves: [2], strength: 2},
       'Plankton':{ moves: [1], strength: 1}
    },

    defaults: function(){
      return {
        species: 'Guppy',
        isSelected: false,
        team: 'local'
      };
    },

    canDevour: function(otherPiece){
        return this.get('team') != otherPiece.get('team') && speciesTypes[this.get('species')].strength >= speciesTypes[otherPiece.get('species')].strength;
    },


  });
});