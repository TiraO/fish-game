define(function (require) {

  "use strict";

  var
     _          = require('underscore'),
     Backbone   = require('backbone'),

     Board      = require('model/board'),
     BoardView  = require('view/boardView'),
     Raphael    = require('raphael'),
     TurnEngine = require('view/turnEngine'),
     Player     = require('model/player');

  return Backbone.View.extend({
    initialize: function(){
      var pi = Math.PI;
      var paper = new Raphael(document.body, "100%", "100%");
      paper.line = paper.line || 
        function(x1,y1,x2,y2){
          return this.path("M"+x1+" "+y1+"L"+x2+" "+y2);
        };


      var board = new Board({
        size: 4,
        center: {
          x: parseFloat(getComputedStyle(document.documentElement).width)/2,
          y: parseFloat(getComputedStyle(document.documentElement).height)/2
        }
      });

      var player1 = new Player({
        board: board,
        pieces: board.initializePlayer1Pieces()
      });

      var player2 = new Player({
        board: board,
        pieces: board.initializePlayer2Pieces()
      });

      
      var cardTypes=["Put back a F.F.F. card.","Pick up a F.F.F. card.","Lose next turn.","Escape to the nearest cave."];
      var deck=[];

      var boardSet= paper.set();
      var paperSet=paper.set();
      paperSet.push(boardSet);

      var mouse = {};
      var boardView = new BoardView({model:board, paperSet:boardSet, paper:paper});
      boardView.render();

      var turnEngine = new TurnEngine({
        board: board,
        boardView: boardView,
        players: [player1, player2]
      });

      turnEngine.nextTurn();
      

      function drawMouseCircle(){
        var mouseSpace =  board.getTileCoordinates(mouse);
        var position = board.getScreenCoordinates(mouseSpace.x, mouseSpace.y);
        var r = Math.random()*255;
        var g = Math.random()*255;
        var b = Math.random()*255;
        paperSet.push(paper.circle(position.x, position.y, board.columnWidth()/10.0).attr({"fill":"rgba(" + r + ","+ g + "," + b +",0.5)"}));
        // boardSet.push(paper.circle(mouse.x, mouse.y, board.columnWidth()/15.0).attr({"fill":"rgba(" + r + ","+ g + "," + b +",0.5)"}));
      }

      document.body.onmousemove=function(e){
        mouse.x = e.pageX;
        mouse.y = e.pageY;
        // drawMouseCircle();
        // drawBoard();
      };

      document.body.onkeypress=function(e){
        if(e.charCode>=48&&e.charCode<=57){
          board.set('size', e.charCode - 48);
          boardView.render();
        }
      };

      window.onresize=function(){
        board.set('center', {
          x: parseFloat(getComputedStyle(document.documentElement).width)/2,
          y: parseFloat(getComputedStyle(document.documentElement).height)/2
        });
        boardView.render();
      };
    }
  });
});