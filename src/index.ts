const mergeDeeper = (object: Record<any, any>, merge: Record<any, any>) => {
  if (!merge || typeof merge === "string") merge = {};
  [...Object.keys(merge), ...Object.getOwnPropertySymbols(merge)].map(
    (el: any) => {
      if (
        typeof merge[el] !== typeof object[el] ||
        (typeof merge[el] && typeof object[el]) !== "object"
      )
        object[el] = merge[el];

      if (!(el in object))
        object[el] =
          typeof merge[el] === "object" && !Array.isArray(merge[el])
            ? { ...merge[el] }
            : merge[el];

      mergeDeeper(object[el], merge[el]);
    }
  );
  return object;
};

export default mergeDeeper;
