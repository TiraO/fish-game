define(function (require) {
  var 
  _           = require('underscore'),
  Backbone    = require('backbone');

  return Backbone.Model.extend({
    //moveCount, species?
    defaults: {
      moveCount: 2,
      species: 'Guppy'
    }
  });
});