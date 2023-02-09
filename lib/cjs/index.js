"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeDeeper = void 0;
const mergeDeeper = (object, merge) => {
    if (typeof merge === "string")
        merge = {};
    [...Object.keys(merge), ...Object.getOwnPropertySymbols(merge)].map((el) => {
        if (!(el in object))
            object[el] =
                typeof merge[el] === "object" && !Array.isArray(merge[el])
                    ? Object.assign({}, merge[el]) : merge[el];
        (0, exports.mergeDeeper)(object[el], merge[el]);
    });
    return object;
};
exports.mergeDeeper = mergeDeeper;
