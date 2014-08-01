define(function (require) {
  var SpaceView = require('view/spaceView'),
      Backbone  = require('backbone');
  
  describe("SpaceView", function(){
    describe('#render', function(){
      describe('when the space contains a piece', function(){
        var spaceView, spaceModel, pieceView, paper, paperSet;
        beforeEach(function(){
          paper = new Raphael(document.body, "100%", "100%");
          paperSet = paper.set();
          spaceModel = new Backbone.Model({
            piece: new Backbone.Model()
          });
          
          pieceView = new Backbone.View();
          
          spaceView = new SpaceView({
            model: spaceModel,
            pieceView: pieceView,
            paper: new Raphael(document.body, "100%", "100%"),
            paperSet: paperSet
          });
        });
        
        it('should render the piece', function(){
          spyOn(pieceView, 'render');
          spaceView.render();
          expect(pieceView.render).toHaveBeenCalled();
        });
        
        xdescribe("when the piece is selected", function(){

          
          it("should hightlight the piece", function(){
            spaceView.render();
            expect(paperSet.pop().attr('height')).toEqual('#F00');
          });
        });
      });
    });
  });
});