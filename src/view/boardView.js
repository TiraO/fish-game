define(function (require) {
  var _           = require('underscore'),
      Backbone    = require('backbone');

  return Backbone.View.extend({
    initialize: function(options){
      this.paperSet = options.paperSet;
      this.paper = options.paper;
    },
    render: function(){
        this.paperSet.remove();

        this.drawCaves();
        this.drawTriangles();
        
        return this;
    },
    
    drawCaves: function(){
        var centerX = this.model.center().x;
        var centerY = this.model.center().y;
        var boardRadius = this.model.radius();
        var boardSize = this.model.size();
        var pi = Math.PI;

        var d="M"+(centerX+Math.sin(pi*2/3)*boardRadius)+" "+(centerY+Math.cos(pi*2/3)*boardRadius);
        console.log('d', d);
        for(var s=0; s<6; s++){
          var sidex1=centerX+Math.sin(pi*(2+s)/3)*boardRadius;
          var sidey1=centerY+Math.cos(pi*(2+s)/3)*boardRadius;
          var sidex2=centerX+Math.sin(pi*(1+s)/3)*boardRadius;
          var sidey2=centerY+Math.cos(pi*(1+s)/3)*boardRadius;

          for(var i=0; i<boardSize; i++){
            var x1=sidex1+(sidex2-sidex1)*((i+0.5)/boardSize);
            var y1=sidey1+(sidey2-sidey1)*((i+0.5)/boardSize);
            this.paperSet.push(this.paper.circle(x1,y1,boardRadius/boardSize/2).attr({"fill":"#F00","stroke":"black"}));
          }
          d+="L"+sidex1+" "+sidey1;
        }

        var outerBoard=this.paper.path(d+"z");
        outerBoard.attr({"fill":"#00F"});
        this.paperSet.push(outerBoard);
    },
    
    drawTriangles: function(){
      var centerX = this.model.center().x;
      var centerY = this.model.center().y;
      var boardRadius = this.model.radius();
      var boardSize = this.model.size();
      var pi = Math.PI;
      
      for(var s=0; s<6; s++){
        var sidex1=centerX+Math.sin(pi*(2+s)/3)*boardRadius;
        var sidey1=centerY+Math.cos(pi*(2+s)/3)*boardRadius;
        var sidex2=centerX+Math.sin(pi*(1+s)/3)*boardRadius;
        var sidey2=centerY+Math.cos(pi*(1+s)/3)*boardRadius;
      
        var side2x1=centerX+Math.sin(pi*(3+s)/3)*boardRadius;
        var side2y1=centerY+Math.cos(pi*(3+s)/3)*boardRadius;
        var side2x2=centerX+Math.sin(pi*(4+s)/3)*boardRadius;
        var side2y2=centerY+Math.cos(pi*(4+s)/3)*boardRadius;
      
        for(var i=0; i<=boardSize; i++){
          var x1=sidex1+(sidex2-sidex1)*(i/boardSize);
          var y1=sidey1+(sidey2-sidey1)*(i/boardSize);
          var x2=side2x1+(side2x2-side2x1)*(i/boardSize);
          var y2=side2y1+(side2y2-side2y1)*(i/boardSize);
          this.paperSet.push(this.paper.line(x1,y1,x2,y2));
        }
      }
      
      for(var yFromTop = 0; yFromTop<this.model.rowCount(); yFromTop++){
        for(var xFromCenter = this.model.minXAt(yFromTop); xFromCenter < this.model.maxXAt(yFromTop); xFromCenter++){
          var position = this.model.getScreenCoordinates(xFromCenter, yFromTop);
          var fillColor;
          if((Math.abs(xFromCenter+yFromTop+0.5))%4<=0.5 && (Math.abs(xFromCenter-yFromTop+0.5))%3<=0.75){
            fillColor = "#FF0";//rgba(255,255,155,1)";
          }else{
            fillColor = "rgba(255,155,155,0.5)";
          }
          this.paperSet.push(this.paper.circle(position.x, position.y, this.model.columnWidth()*0.5).attr({"fill":fillColor}));
        }
      }
    }
  });
});