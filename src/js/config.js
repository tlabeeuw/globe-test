require.config({
  baseUrl: 'js',

  paths: {
    jquery: '//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.0/jquery.min',
    underscore: '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.6.0/underscore-min',
    backbone: '//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min',
    three: '//cdnjs.cloudflare.com/ajax/libs/three.js/r61/three.min',
    tween: 'vendor/tween',
    globe: 'vendor/globe',
    template: 'template',
  },

  shim: {
    jquery: {
      exports: '$'
    },
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    three: {
      exports: 'THREE'
    },
    tween: {
      exports: 'TWEEN'
    },
    globe: {
      deps: ['three', 'tween'],
      exports: 'DAT'
    },
    template: ['backbone']
  }
});
