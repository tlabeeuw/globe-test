define(['backbone', 'template'], function (Backbone, JST) {
  return Backbone.View.extend({
    template: JST.no_web_gl,

    render: function () {
      $("body").removeClass("loading");
      this.$el.html(this.template());
      return this;
    }
  });
});
