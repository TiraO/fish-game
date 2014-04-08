define(function (require) {
  var SpaceView = require('view/spaceView'),
      Backbone  = require('backbone');
  
  describe("SpaceView", function(){
    describe('#render', function(){
      describe('when the space contains a piece', function(){
        var spaceView, spaceModel;
        beforeEach(function(){
          spaceModel = new Backbone.Model({
            pieceModel: new Backbone.Model()
          });
          
          pieceView = new Backbone.View();
          
          spaceView = new SpaceView({
            model: spaceModel,
            pieceView: pieceView
          });
          
          spaceModel = new Backbone.Model({
            gamePieceModel: new Backbone.Model()
          })
        });
        
        it('should render the piece', function(){
          spyOn(pieceView, 'render');
          spaceView.render();
          expect(pieceView.render).toHaveBeenCalled();
        });
      });
    });
  });
});