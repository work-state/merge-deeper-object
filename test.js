var assert = require("chai").assert;
require("mocha");
const mergeDeeper = require(".");

describe("merge deeper", function () {
  it("should merge object properties", function () {
    var obj1 = { a: 1, b: 2 };
    var obj2 = { c: 3, d: 4 };

    var true_output = { a: 1, b: 2, c: 3, d: 4 };
    var false_output = { a: 1, b: 5 };

    assert.deepEqual(mergeDeeper(obj1, obj2), true_output);
    assert.notDeepEqual(mergeDeeper(obj1, obj2), false_output);
  });

  it("should not merge primitive values", function () {
    var obj1 = { a: 1, b: 2, c: 3 };
    var obj2 = { a: 4, b: 5, d: 6 };

    var output = { a: 4, b: 5, d: 6, c: 3 };
    assert.deepEqual(mergeDeeper(obj1, obj2), output);
  });

  it("should do a deep merge", function () {
    var obj1 = { a: { b: { c: "1" } }, d: [{ e: "2" }] };
    var obj2 = { a: { b: { c: "5", g: "3" } }, d: [{ h: "4" }] };

    var output = { a: { b: { c: "5", g: "3" } }, d: [{ e: "2" }, { h: "4" }] };
    assert.deepEqual(mergeDeeper(obj1, obj2), output);
  });
});
