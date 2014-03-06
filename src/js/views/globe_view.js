define(['backbone', 'globe', 'tween'], function (Backbone, DAT, TWEEN) {
  return Backbone.View.extend({
    className: "globe",

    initialize: function () {
      this.collection.fetch({ reset: true });
      this.listenTo(this.collection, 'reset', this.render);
    },

    render: function () {
      TWEEN.start();

      this.collection.each(function (factoryOutput) {
        this.globe().addData(factoryOutput.get("data"), {
          format: 'magnitude',
          name: factoryOutput.get("year"),
          animated: true
        });
      }, this);

      this.globe().createPoints();

      this.setTime(0)();
      this.globe().animate();

      $("body").removeClass("loading");

      return this;
    },

    setTime: function(index) {
      return _.bind(function() {
        new TWEEN.Tween(this.globe())
          .to({ time: index / this.collection.length }, 500)
          .easing(TWEEN.Easing.Cubic.EaseOut)
          .start();
        }, this);
      },

    globe: function () {
      this._globe = this._globe || new DAT.Globe(this.el);
      return this._globe;
    },

    setYear: function (year) {
      this.setTime(this.collection.indexOfYear(year))();
    }
  });
});
