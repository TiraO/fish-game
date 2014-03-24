define(function (require) {
    var _           = require('underscore'),
        Backbone    = require('backbone');
        
        
    return Backbone.Model.extend({
        initialize: function(){
            
        },
        
        size: function(){
            return this.get('size');
        },
        
        center: function(){
            return this.get('center');
        },
        
        radius: function(){
            var center = this.center();
            Math.min(center.x,center.y)*0.9;
        }
    });
});