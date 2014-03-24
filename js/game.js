define(function (require) {
 
    "use strict";
 
    var _           = require('underscore'),
        Backbone    = require('backbone');
        
        
    return Backbone.View.extend({
        initialize: function(){
            var pi = Math.PI;
            var paper = new Raphael(document.body, "100%", "100%");
            paper.line = paper.line
            //
            ||	/*
            \\  */
            function(x1,y1,x2,y2){
            	return this.path("M"+x1+" "+y1+"L"+x2+" "+y2);
            };
            /*paper.arc = function(r, centerX, centerY, radius, startAngle, endAngle) {
            	var startX = centerX+radius*Math.cos((90-startAngle)*Math.PI/180); 
            	var startY = centerY-radius*Math.sin((90-startAngle)*Math.PI/180);
            	var endX = centerX+radius*Math.cos((90-endAngle)*Math.PI/180);
            	var endY = centerY-radius*Math.sin((90-endAngle)*Math.PI/180);
            	return r.path([['M',startX, startY],['A',radius,radius,0,1,1,endX,endY]]);
            }*/
            
            
            var board=[];
            var cardTypes=["Put back a F.F.F. card.","Pick up a F.F.F. card.","Lose next turn.","Escape to the nearest cave."];
            var deck=[];
            
            var boardSet=paper.set();
            
            var mouse = {};
            var center = {};
            var boardRadius;
            var board = {size: 12};
            drawBoard();
            
            function drawBoard(){
            	boardSet.remove();
            	
            	center = {
            	    x: parseFloat(getComputedStyle(document.documentElement).width)/2,
                    y: parseFloat(getComputedStyle(document.documentElement).height)/2
            	};
            	
                board.radius=Math.min(center.x,center.y)*0.9;
                board.center = center;
                
                /// draw caves
                drawCaves(board);
            	
            	
            	
                /// draw triangles
            	drawTriangles(board, boardSet);
                
                var mouseSpace = getBoardCoordinates(mouse.x, mouse.y, board);
            //    var position = getScreenCoordinates(mouseSpace.x, mouseSpace.y, centerX, centerY, boardRadius);
            //	boardSet.push(paper.circle(position.x, position.y, getColumnWidth(boardRadius)/10.0).attr({"fill":"rgba(0,155,155,0.5)"}));
              
              
            //   //Make it look all ugly and stuff.
            // 	if(paper.shapes&&paper.shapes[0]&&paper.shapes[0].moveBy){
            // 		var r = Math.sqrt(centerY*centerX)/50;
            // 		for(var i=0;i<paper.shapes.length;i++){
            // 			paper.shapes[i].moveBy((Math.random()-0.5)*r,(Math.random()-0.5)*r,(Math.random()-0.5)*r,(Math.random()-0.5)*r);
            // 		}
            // 	}
                   
            }
            
            function drawCaves(board){
                // centerX, centerY, boardRadius, boardSize){
                var centerX = board.center.x;
                var centerY = board.center.y;
                var boardRadius = board.radius;
                var boardSize = board.size;
                
                	var d="M"+(centerX+Math.sin(pi*2/3)*boardRadius)+" "+(centerY+Math.cos(pi*2/3)*boardRadius);
            	for(var s=0; s<6; s++){
            		var sidex1=centerX+Math.sin(pi*(2+s)/3)*boardRadius;
            		var sidey1=centerY+Math.cos(pi*(2+s)/3)*boardRadius;
            		var sidex2=centerX+Math.sin(pi*(1+s)/3)*boardRadius;
            		var sidey2=centerY+Math.cos(pi*(1+s)/3)*boardRadius;
            		
            		for(var i=0; i<boardSize; i++){
            			var x1=sidex1+(sidex2-sidex1)*((i+0.5)/boardSize);
            			var y1=sidey1+(sidey2-sidey1)*((i+0.5)/boardSize);
            			boardSet.push(paper.circle(x1,y1,boardRadius/boardSize/2).attr({"fill":"#F00","stroke":"black"}));
            		}
            		d+="L"+sidex1+" "+sidey1;
            	}
            	
            	var outerBoard=paper.path(d+"z");
            	outerBoard.attr({"fill":"#00F"});
            	boardSet.push(outerBoard);
            }
            
            function drawTriangles(board, boardSet){
                // centerX, centerY, boardRadius, boardSize, boardSet){
                var centerX = board.center.x;
                var centerY = board.center.y;
                var boardRadius = board.radius;
                var boardSize = board.size;
                
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
            			boardSet.push(paper.line(x1,y1,x2,y2));
            		}
            	}
            	
                for(var yFromTop = 0; yFromTop<getRowCount(); yFromTop++){
                    for(var xFromCenter = minXAt(yFromTop); xFromCenter < maxXAt(yFromTop); xFromCenter++){
                        var position = getScreenCoordinates(xFromCenter, yFromTop, board.center.x, board.center.y, board.radius);
                        var fillColor;
                        if((Math.abs(xFromCenter+yFromTop+0.5))%4<=0.5 && (Math.abs(xFromCenter-yFromTop+0.5))%3<=0.75){
                    		fillColor = "rgba(255,255,155,1)";
                    	}else{
                    		fillColor = "rgba(255,155,155,0.5)";
                    	}
                    	boardSet.push(paper.circle(position.x, position.y, getColumnWidth(boardRadius)*.5).attr({"fill":fillColor}));
                    }
                } 
            }
            
            function drawMouseCircle(){
                var mouseSpace = getBoardCoordinates(mouse.x, mouse.y, board);
                var position = getScreenCoordinates(mouseSpace.x, mouseSpace.y, board.center.x, board.center.y, board.radius);
                var r = Math.random()*255;    
                var g = Math.random()*255;    
                var b = Math.random()*255;
                boardSet.push(paper.circle(position.x, position.y, getColumnWidth(boardRadius)/10.0).attr({"fill":"rgba(" + r + ","+ g + "," + b +",0.5)"}));
                boardSet.push(paper.circle(mouse.x, mouse.y, getColumnWidth(boardRadius)/15.0).attr({"fill":"rgba(" + r + ","+ g + "," + b +",0.5)"}));
            }
            
            function minXAt(yFromTop){
                return -1*getWidthAt(yFromTop)/2;
            }
            
            function maxXAt(yFromTop){
                return getWidthAt(yFromTop)/2;
            }
            
            function pointsLeft(xFromCenter, yFromTop){
                if(((1+ Math.abs(xFromCenter))%2 + Math.abs(yFromTop)%2)%2 ==1 ){
                    return true;
                }
                return false;
            }
            
            function getRowCount(){
                return 4*board.size;
            }
            function getColumnCount(){
                return board.size*2;
            }
            function getRowHeight(boardRadius){
                var rowCount = getRowCount();
                return 2.0*boardRadius/rowCount;
            }
            function getColumnWidth(boardRadius){
                var equilateralTriangleHeight = Math.sqrt(3)/2.0;    
                return equilateralTriangleHeight*board.radius/getColumnCount();
            }
            function getWidthAt(yFromTop){
                var section = Math.floor(yFromTop/board.size);
                var depthInSection = yFromTop%board.size;
                if(section == 1 || section ==2){
                    return 2*board.size;
                }
            
                if(section == 3){
                    depthInSection = board.size -depthInSection;
                }
                
                return depthInSection*2;
            }
            
            function getScreenCoordinates(xFromCenter, yFromTop, centerX, centerY, boardRadius){
                var rowCount = getRowCount();
                var columnCount = getColumnCount();
                var rowHeight = getRowHeight(boardRadius);
                var columnWidth = getColumnWidth(boardRadius);
                
                var xFudge = (2*columnWidth/3)*( pointsLeft(xFromCenter,yFromTop)+ 2.5);
                var yTop = centerY-(rowCount/2.0)*rowHeight;
                var resultY = yTop + yFromTop*rowHeight;
                var resultX = (xFromCenter -0.5)*2*columnWidth + centerX + xFudge;
                
                var result = {};
                result.x = resultX;
                result.y = resultY;
                return result;
            }
            
            function getBoardCoordinates(screenX, screenY, board){
                // centerX, centerY, boardRadius){
                var centerX = board.center.x;
                var centerY = board.center.y;
                var boardRadius = board.radius;
                
                var columnWidth = getColumnWidth(boardRadius);
                var boardX = 0.5*(screenX - centerX)/columnWidth;
                var rowHeight = getRowHeight(boardRadius);
                var yTop = centerY - (rowHeight * getRowCount() /2);
                var boardY = (screenY - yTop) / rowHeight;
                var slope;
                var offset = 0;
                if(pointsLeft(Math.floor(boardX), Math.floor(boardY))){
                    slope = 1;        
                } else {
                    slope = -1;
                    offset = 1;
                }
                var tileX = boardX - Math.floor(boardX);
                var tileY = boardY - Math.floor(boardY);
                
                if(tileY > slope*tileX + offset){
                    boardY = Math.floor(boardY) + 1;
                } else {
                    boardY = Math.floor(boardY);
                }
                boardX = Math.floor(boardX);
                
                var result = {};
                result.x = boardX;
                result.y = boardY;
                return result;
            }
            
            document.body.onmousemove=function(e){
                
                mouse.x = e.pageX;
                mouse.y = e.pageY;
                // drawMouseCircle();
                // drawBoard();
            }
            
            document.body.onkeypress=function(e){
                if(e.charCode>=48&&e.charCode<=57){
                    board.size = e.charCode - 48;
                    drawBoard();
                    console.log("size", e.charCode - 48);
                }
            };
            
            window.onresize=function(){drawBoard();};

        }
    });
});