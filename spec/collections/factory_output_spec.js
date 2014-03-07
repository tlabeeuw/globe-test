define(['collections/factory_output'], function(FactoryOutput) {
  describe("Factory Output", function () {
    beforeEach(function () {
      this.collection = new FactoryOutput([
        {"year": 1999, data: []},
        {"year": 2000, data: []},
      ]);
    });

    describe("#url", function () {
      it("fetches the data from the correct url", function () {
        this.collection.fetch();
        expect(jasmine.Ajax.requests.mostRecent().url).toBe("/data.json");
      });
    });

    describe("#indexOfYear", function () {
      it("returns the index of the given year", function () {
        expect(this.collection.indexOfYear(2000)).toEqual(1);
      });
    });

    describe("#years", function () {
      it("returns all the years", function () {
        expect(this.collection.years()).toEqual([1999, 2000]);
      });
    });
  });
});
