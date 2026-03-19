const UNSAFE_KEYS = new Set(['__proto__', 'constructor', 'prototype']);

function isSafe(key) {
  return typeof key === 'symbol' || !UNSAFE_KEYS.has(key);
}

function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

export default function mergeDeeper(target, source) {
  if (!isPlainObject(source)) return target;

  const result = { ...target };

  for (const key of [
    ...Object.keys(source),
    ...Object.getOwnPropertySymbols(source),
  ]) {
    if (!isSafe(key)) continue;

    const srcVal = source[key];
    const targetVal = result[key];

    if (Array.isArray(srcVal) && Array.isArray(targetVal)) {
      result[key] = [...targetVal, ...srcVal];
    } else if (isPlainObject(srcVal) && isPlainObject(targetVal)) {
      result[key] = mergeDeeper(targetVal, srcVal);
    } else {
      result[key] = srcVal;
    }
  }

  return result;
}
