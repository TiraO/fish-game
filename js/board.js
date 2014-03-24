define(function (require) {
    var _           = require('underscore'),
        Backbone    = require('backbone');
        
        

    var cached = {
        center: undefined,
        radius: undefined
    };
    
    
    var equilateralTriangleHeight = Math.sqrt(3)/2.0;
    
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
            if(center == cached.center){
                return cached.radius;
            } else {
                cached.radius = Math.min(center.x,center.y)*0.9;    
                return cached.radius;
            }
        },
        
        getWidthAt: function(yFromTop){
            var section = Math.floor(yFromTop/this.size());
            var depthInSection = yFromTop%this.size();
            if(section == 1 || section ==2){
                return 2*this.size();
            }
        
            if(section == 3){
                depthInSection = this.size() -depthInSection;
            }
            
            return depthInSection*2;
        },
        
        maxXAt: function(yFromTop){
            return this.getWidthAt(yFromTop)/2;
        },
        
        minXAt: function(yFromTop){
            return -1*this.getWidthAt(yFromTop)/2;
        },
        
        rowCount: function(){
            return 4*this.size();
        },
        
        columnCount: function(){
             return this.size()*2;
        },
        
        rowHeight: function(){
            return 2.0*this.radius()/this.rowCount();
        },
        
        columnWidth: function(){
            return equilateralTriangleHeight*this.radius()/this.columnCount();
        }
        
    });
});