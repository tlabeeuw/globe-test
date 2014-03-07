define(['backbone', 'template', './globe_view', './no_gl_view'], function (Backbone, JST, GlobeView, NoGlView) {
  return Backbone.View.extend({
    template: JST.application,
    el: "#application",

    events: {
      "click .year": "onYearClick"
    },

    initialize: function () {
      if (this.hasWebGl()) {
        this.collection.fetch();
        this.listenTo(this.collection, 'sync', this.render);
      } else {
        this.$el.html(new NoGlView().render().el);
      }
    },

    render: function () {
      this.$el.html(this.template({ years: this.collection.years() }));
      this.$("#globe").html(this.globeView().render().el);
      this.$(".year:first").addClass("active");
      $("body").removeClass("loading");

      return this;
    },

    onYearClick: function (event) {
      var $target = $(event.target);
      this.$(".year").removeClass("active");
      this.globeView().setYear($target.data("year"));
      $target.addClass("active");
    },

    globeView: function () {
      this._globeView = this._globeView || new GlobeView({ collection: this.collection });
      return this._globeView;
    },

    hasWebGl: function () {
      try {
        return !! window.WebGLRenderingContext && !! document.createElement( 'canvas' ).getContext( 'experimental-webgl' );
      } catch( e ) {
        return false;
      }
    }
  });
});
