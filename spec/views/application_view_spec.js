define(['views/application_view', 'collections/factory_output'], function (ApplicationView, FactoryOutput) {
  describe("Application View", function () {
    beforeEach(function () {
      this.globeFake = jasmine.createSpyObj("globe", [
        "addData", "createPoints", "animate"
      ]);
      spyOn(DAT, "Globe").andReturn(this.globeFake);

      $("body").addClass("loading");
      this.$specs.html("<div id='application' />");

      this.collection = new FactoryOutput();
      this.successResponse = {
        status: 200,
        responseText: JSON.stringify([
          {
            "data": [1, 2, 3],
            "year": "2023"
          }, {
            "data": [1, 2, 3],
            "year": "2024"
          }, {
            "data": [1, 2, 3],
            "year": "2025"
          }
        ])
      };
      this.oldWebGLRenderingContext = window.WebGLRenderingContext;
    });

    afterEach(function () {
      window.WebGLRenderingContext = this.oldWebGLRenderingContext;
      jasmine.Ajax.requests.reset();
    });

    describe("#render", function () {
      context("when WebGL is available", function () {
        beforeEach(function () {
          window.WebGLRenderingContext = true;
          this.view = new ApplicationView({ collection: this.collection });
          jasmine.Ajax.requests.mostRecent().response(this.successResponse);
        });

        it("displays the legend", function () {
          expect(this.view.$("#legend").is(":visible")).toBe(true);
        });

        it("displays the globe", function () {
          expect(this.view.$("#globe").is(":visible")).toBe(true);
          expect(this.globeFake.animate).toHaveBeenCalled();
        });

        it("removes the loading image", function () {
          expect($("body").hasClass("loading")).toBe(false);
        });

        it("set the right button as active", function () {
          expect(this.view.$(".year:nth-child(1)").hasClass("active")).toBe(true);
          expect(this.view.$(".year:nth-child(2)").hasClass("active")).toBe(false);
          expect(this.view.$(".year:nth-child(3)").hasClass("active")).toBe(false);
        });
      });

      context("when WebGL is not available", function () {
        beforeEach(function () {
          window.WebGLRenderingContext = false;
          this.view = new ApplicationView({ collection: this.collection });
        });

        it("have no data request", function () {
          expect(jasmine.Ajax.requests.mostRecent()).toBeUndefined();
        });

        it("displays a warning that WebGL is necessary", function () {
          expect(this.view.$("#globe").is(":visible")).toBe(false);
          expect(this.view.$el.text()).toContain("No WebGL");
          expect(this.globeFake.animate).not.toHaveBeenCalled();
        });
      });
    });

    describe("#onYearClick", function () {
      beforeEach(function () {
        this.view = new ApplicationView({ collection: this.collection });
        jasmine.Ajax.requests.mostRecent().response(this.successResponse);
        spyOn(this.view.globeView(), "setYear");
      });

      it("set the year on the globe view", function () {
        this.view.$(".year:nth-child(2)").click();
        expect(this.view.globeView().setYear).toHaveBeenCalledWith(2024);
      });

      it("set the right button as active", function () {
        this.view.$(".year:nth-child(3)").click();

        expect(this.view.$(".year:nth-child(1)").hasClass("active")).toBe(false);
        expect(this.view.$(".year:nth-child(2)").hasClass("active")).toBe(false);
        expect(this.view.$(".year:nth-child(3)").hasClass("active")).toBe(true);
      });
    });
  });

});
