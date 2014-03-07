define(['views/globe_view', 'collections/factory_output'], function (GlobeView, FactoryOutput) {
  describe("Globe View", function () {
    beforeEach(function () {
      this.globeFake = jasmine.createSpyObj("globe", [
        "addData", "createPoints", "animate"
      ]);
      spyOn(DAT, "Globe").andReturn(this.globeFake);

      this.collection = new FactoryOutput([
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
      ]);
      this.view = new GlobeView({ collection: this.collection });
    });

    describe("#render", function () {
      beforeEach(function () {
        this.$specs.html(this.view.render().el);
      });

      it("creates all the globe points and animates", function () {
        expect(this.globeFake.createPoints).toHaveBeenCalled();
        expect(this.globeFake.animate).toHaveBeenCalled();
      });

      it("adds all the data points", function () {
        expect(this.globeFake.addData).toHaveBeenCalledWith(
          [1,2,3], {format: "magnitude",  name: "2023", animated: true}
        );
      });

      xit("tweens", function () {

      });
    });

    describe("#setYear", function () {
      xit("renimates the globe with the new data", function () {
        this.view.setYear("2010");
      });
    });
  });
});
