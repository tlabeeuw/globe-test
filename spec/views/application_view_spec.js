define(['views/application_view'], function (ApplicationView) {
  describe("Application View", function () {
    beforeEach(function () {
      this.globeFake = jasmine.createSpyObj("globe", [
        "addData", "createPoints", "animate"
      ]);
      spyOn(DAT, "Globe").andReturn(this.globeFake);

      this.view = new ApplicationView();
    });

    describe("#render", function () {
      context("when WebGL is available", function () {
        beforeEach(function () {
          this.$specs.append(this.view.render().el);
        });

        it("displays the legend", function () {
          expect(this.view.$("#legend").is(":visible")).toBe(true);
        });

        it("displays the globe", function () {
          expect(this.view.$("#globe").is(":visible")).toBe(true);
          expect(this.globeFake.animate).toHaveBeenCalled();
        });
      });

      context("when WebGL is not available", function () {
        beforeEach(function () {
          this.oldWebGLRenderingContext = window.WebGLRenderingContext;
          window.WebGLRenderingContext = false;
          this.$specs.append(this.view.render().el);
        });

        afterEach(function () {
           window.WebGLRenderingContext = this.oldWebGLRenderingContext;
        });

        it("displays a warning that WebGL is necessary", function () {
          expect(this.view.$(".globe").is(":visible")).toBe(false);
          expect(this.view.$el.text()).toContain("No WebGL");
          expect(this.globeFake.animate).not.toHaveBeenCalled();
        });
      });
    });

    describe("#onYearClick", function () {
      beforeEach(function () {
        spyOn(this.view.globeView(), "setYear");
        this.$specs.append(this.view.render().el);
      });

      it("set the year on the globe view", function () {
        this.view.$(".year:first").click();
        expect(this.view.globeView().setYear).toHaveBeenCalledWith(1990);
      });
    });
  });

});
