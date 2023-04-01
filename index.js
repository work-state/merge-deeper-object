module.exports = function mergeDeeper(object, merge) {
  if (!merge || typeof merge === "string") merge = {};
  [...Object.keys(merge), ...Object.getOwnPropertySymbols(merge)].map((key) => {
    if (Array.isArray(merge[key]) && Array.isArray(object[key])) {
      object[key] = [...object[key], ...merge[key]];
    } else {
      if (
        key in object &&
        (typeof merge[key] && typeof object[key]) === "object"
      ) {
        mergeDeeper(object[key], merge[key]);
      } else {
        object[key] = merge[key];
      }
    }
  });
  return object;
};
