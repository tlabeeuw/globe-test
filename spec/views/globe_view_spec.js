define(['views/globe_view', 'collections/factory_output'], function (GlobeView, FactoryOutput) {
  describe("Globe View", function () {
    beforeEach(function () {
      this.globeFake = jasmine.createSpyObj("globe", [
        "addData", "createPoints", "animate"
      ]);
      spyOn(DAT, "Globe").andReturn(this.globeFake);

      this.collection = new FactoryOutput();
      this.view = new GlobeView({
        collection: this.collection
      });
    });

    describe("#render", function () {
      beforeEach(function () {
        this.successResponse = {
          status: 200,
          responseText: JSON.stringify([{
            "data": [1, 2, 3],
            "year": "2023"
          }])
        };
      });

      it("removes the loading image", function () {
        $("body").addClass("loading");

        expect($("body").hasClass("loading")).toBe(true);

        jasmine.Ajax.requests.mostRecent().response(this.successResponse);

        expect($("body").hasClass("loading")).toBe(false);
      });

      it("creates all the globe points and animates", function () {
        expect(this.globeFake.createPoints).not.toHaveBeenCalled();
        expect(this.globeFake.animate).not.toHaveBeenCalled();

        jasmine.Ajax.requests.mostRecent().response(this.successResponse);

        expect(this.globeFake.createPoints).toHaveBeenCalled();
        expect(this.globeFake.animate).toHaveBeenCalled();
      });

      it("adds all the data points", function () {
        expect(this.globeFake.addData).not.toHaveBeenCalled();

        jasmine.Ajax.requests.mostRecent().response(this.successResponse);

        expect(this.globeFake.addData).toHaveBeenCalledWith(
          [1,2,3], {format: "magnitude",  name: "2023", animated: true}
        );
      });
    });

    describe("#setYear", function () {
      it("renimates the globe with the new data", function () {
        this.view.setYear("2010");
      });
    });
  });
});
