define(['backbone', 'template', './globe_view', 'collections/factory_output'], function (Backbone, JST, GlobeView, FactoryOutput) {
  return Backbone.View.extend({
    className: "application",
    years: ["1990", "1995", "2000"],

    events: {
      "click .year": "onYearClick"
    },

    render: function () {
      var self = this;

      this.$el.html(this.template({ years: this.years }));
      this.$("#globe").html(function () {
        return self.globeView().render().el;
      });

      return this;
    },

    template: function (data) {
      var _template = this.hasWebGl() ? "application" : "no_web_gl";
      return JST[_template](data);
    },

    onYearClick: function (event) {
      var year = $(event.target).data("year");
      this.globeView().setYear(year);
    },

    globeView: function () {
      this._globeView = this._globeView || new GlobeView({
        collection: new FactoryOutput()
      });

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
