define(function (require) {
  var 
  _           = require('underscore'),
  Backbone    = require('backbone');

  return Backbone.Model.extend({
    defaults: function(){
      return {
        pathLength: null,
        piece: null,
        startCoords: null,
        startSpace: null,
        endSpace: null,
        completeCallback: null
      };
    },

    complete: function(){
      this.get('startSpace').remove(this.get('piece'));
      this.get('endSpace').add(this.get('piece'));
      var callback = this.get('completeCallback');
      if(callback){
        callback();
      }
    }

    // undo: function(){
      // this.get('endSpace').remove(this.get('piece'));
      // this.get('startSpace').add(this.get('piece'));
    // }
  });
});