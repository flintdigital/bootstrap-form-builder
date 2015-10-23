require.config({
  baseUrl: 'assets/js',

  paths: {
    jquery:       '../../bower_components/jquery/dist/jquery',
    underscore:   '../../bower_components/underscore/underscore',
    text:         '../../bower_components/text/text',
    backbone:     '../../bower_components/backbone/backbone',
    bootstrap:    '../../bower_components/bootstrap/dist/js/bootstrap'
  },

  shim: {
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },

    bootstrap: {
      deps: ['jquery'],
      exports: '$.fn.popover'
    }
  }
});

require([
  'app'
],

function (app) {
  app.initialize();
});
