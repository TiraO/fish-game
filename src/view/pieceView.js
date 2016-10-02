define(function (require) {
  var Backbone  = require('backbone'),
      _         = require('underscore'),
      $         = require('jquery');
  
  return Backbone.View.extend({
    initialize: function(options){
      this.paperSet = options.paperSet;
      this.paper = options.paper;
      this.screenCoord = options.screenCoord || this.model.get('screenCoord');
    },
    
    render: function(){
      this.paperSet.remove();
      var text = this.paper.text(this.screenCoord.x, this.screenCoord.y, this.model.get('species')).attr({
        "fill": this.model.get('isSelected')? '#0F2' : "#0AA"
      });
      $(text.node).css({
        "-webkit-touch-callout": "none",
        "-webkit-user-select": "none",
        "-khtml-user-select": "none",
        "-moz-user-select": "none",
        "-ms-user-select": "none",
        "user-select": "none",
        "cursor": "default"
      });

      this.paperSet.push(text);
      
      var circle = this.paper.circle(this.screenCoord.x, this.screenCoord.y, 10).attr({
        fill:this.model.get('team') == 'player2'? '#F00' : "#0F0",
        'fill-opacity': this.model.get('isSelected')? 0.80 : 0.50
        
      });
      this.paperSet.push(circle);

      
      // circle.click(_.bind(function () {
      //       this.model.set('isSelected', !this.model.get('isSelected'));
      //       this.render();
      //    }, this));
    }
  });
});