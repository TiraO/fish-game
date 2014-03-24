requirejs.config({
  baseUrl: 'js',
  paths: {
    jquery: 'http://cdnjs.cloudflare.com/ajax/libs/jquery/1.8.3/jquery',
    underscore: 'http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore',
    backbone: 'http://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone'
  },
  shim: {
    backbone: {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    },
    underscore: {
      exports: '_'
    },
    jquery: {
      exports: '$'
    }
  }
});

define(['underscore', 'backbone', 'game'],
  function(_, Backbone, Application) {
    new Application();
  });