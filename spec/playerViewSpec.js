define(function (require) {
  var Player     = require('model/player'),
      Space      = require('model/space'),
      SpaceView  = require('view/SpaceView'),
      PlayerView = require('view/PlayerView'),
      PlayerTurn = require('model/PlayerTurn'),
      BoardView  = require('view/BoardView'),
      Board      = require('model/Board'),
      _          = require("underscore");
  
  describe("PlayerView", function(){
    var player;
    beforeEach(function(){
      player = new Player();
    });

    describe('a local human player view', function(){
      describe("#takeTurn", function(){
        var validSpace, turn, boardView, paperSet, paper, spaceView;
        beforeEach(function(){
          Raphael.el.trigger = function (eventType, scope, params){ 
            scope = scope || this;
            for(var i = 0; i < this.events.length; i++){
              if(this.events[i].name === eventType){
                this.events[i].f.call(scope, params);
              }
            }
          };

          board = new Board();

          paper = new Raphael(document.body, "10%", "10%");
          paperSet = paper.set();
          // boardView = new BoardView({
          //   model: board,
          //   paper: paper,
          //   paperSet: paperSet
          // });
          turn = new PlayerTurn({
            pathLength: 1,
            startCoords: {xFromCenter: 0, yFromTop: 0},
            validMoves: [{xFromCenter:0, yFromTop:1}]
          });

          playerView = new PlayerView({
            model: player,
            board: board
          });

          var spaceView = new SpaceView({
            paper: paper,
            paperSet: paperSet,
            model: board.get('spaces')[0][1],
            screenCoord: {}
          }).render();
        });

        xit('should re-render the valid move spaces', function(){
          spyOn(spaceView, "render");
          playerView.takeTurn(turn);
          expect(spaceView.render).toHaveBeenCalled();
        });

        describe("when a valid space is clicked", function(){
          beforeEach(function(){
            playerView.takeTurn(turn);
          });

          it("should complete the turn with that space", function(){
            spyOn(turn, "complete");
            paperSet[1].trigger('click', paperSet[1]);
            expect(turn.complete).toHaveBeenCalled();
          });
        });
      });
    });
  });
});