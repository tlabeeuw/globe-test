beforeEach(function () {
  $("body").append("<div id='specs'></div>");
  this.$specs = $("#specs");

  jasmine.Ajax.install();
});

afterEach(function () {
  this.$specs.remove();
});

context = describe;
