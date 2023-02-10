## merge-deeper-object

---
Combine the attributes of objects deeply. Compatible with both CommonJS (CJS) and ECMAScript Module (ESM) formats.

## Install


```
npm install --save @work-state/merge-deeper-object
```

## Running tests


```
npm install
npm run test
```

## Usage


```javascript
var mergeDeeper = require('@work-state/merge-deeper-object')

var obj1 = { a: { b: { c: 1 } }, d: "d", e: { f: true } }
var obj2 = { a: { g: "g" }, d: "dd", e: { f: false }  }

mergeDeeper(obj1, obj2)


> { a: { b: { c: 1 }, g: "g" }, d: "dd", e: { f: false } }
```

## Author
**Ilyass Mabrouk**

## License
[MIT](https://github.com/work-state/merge-deeper-object/blob/master/LICENSE.md)
