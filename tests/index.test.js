import { describe, it, expect } from 'vitest';

import mergeDeeper from '../src/index.js';

describe('mergeDeeper', () => {
  it('merges flat properties', () => {
    expect(mergeDeeper({ a: 1 }, { b: 2 })).toEqual({ a: 1, b: 2 });
  });

  it('deep merges nested objects', () => {
    const result = mergeDeeper({ a: { x: 1 } }, { a: { y: 2 } });
    expect(result).toEqual({ a: { x: 1, y: 2 } });
  });

  it('concatenates arrays', () => {
    expect(mergeDeeper({ a: [1] }, { a: [2] })).toEqual({ a: [1, 2] });
  });

  it('does not mutate the original target', () => {
    const target = { a: { x: 1 } };
    const result = mergeDeeper(target, { a: { y: 2 } });
    expect(target.a).toEqual({ x: 1 });
    expect(result.a).toEqual({ x: 1, y: 2 });
  });

  it('handles null values in source', () => {
    expect(mergeDeeper({ a: { x: 1 } }, { a: null })).toEqual({ a: null });
  });

  it('handles empty/invalid source gracefully', () => {
    expect(mergeDeeper({ a: 1 }, undefined)).toEqual({ a: 1 });
    expect(mergeDeeper({ a: 1 }, null)).toEqual({ a: 1 });
    expect(mergeDeeper({ a: 1 }, 'string')).toEqual({ a: 1 });
  });

  it('supports Symbol keys', () => {
    const sym = Symbol('test');
    expect(mergeDeeper({}, { [sym]: 42 })).toEqual({ [sym]: 42 });
  });

  it('overwrites primitives with objects and vice versa', () => {
    expect(mergeDeeper({ a: 1 }, { a: { x: 1 } })).toEqual({ a: { x: 1 } });
    expect(mergeDeeper({ a: { x: 1 } }, { a: 1 })).toEqual({ a: 1 });
  });
});

describe('prototype pollution protection', () => {
  it('ignores __proto__ keys', () => {
    const target = {};
    const malicious = JSON.parse('{"__proto__": {"polluted": true}}');
    const result = mergeDeeper(target, malicious);
    expect(result.polluted).toBeUndefined();
    expect({}.polluted).toBeUndefined();
  });

  it('ignores constructor keys', () => {
    const result = mergeDeeper(
      {},
      { constructor: { prototype: { polluted: true } } }
    );
    expect(result).not.toHaveProperty('constructor');
    expect({}.polluted).toBeUndefined();
  });

  it('ignores prototype keys', () => {
    const result = mergeDeeper({}, { prototype: { polluted: true } });
    expect(result.prototype).toBeUndefined();
  });

  it('still allows Symbol keys', () => {
    const sym = Symbol('safe');
    const result = mergeDeeper({}, { [sym]: 'value' });
    expect(result[sym]).toBe('value');
  });
});
