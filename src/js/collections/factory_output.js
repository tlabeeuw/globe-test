define(['backbone'], function (Backbone) {
  return Backbone.Collection.extend({
    url: "/data.json",

    indexOfYear: function (year) {
      return _(this.years()).indexOf(year);
    },

    years: function () {
      return this.pluck("year");
    }
  });
});
