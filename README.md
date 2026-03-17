## merge-deeper-object

A lightweight, zero-dependency utility for deep merging objects

## Features

- **Deep merge object:** recursively merges nested objects
- **Array concatenation:** arrays are combined, not overwritten
- **Immutable:** returns a new object, never mutates the originals
- **Symbol support:** handles Symbol keys alongside string keys
- **Secure:** blocks prototype pollution
- **Dual format:** ships both CJS and ESM builds
- **Zero dependencies**

## Installation

```
npm install merge-deeper-object
```

```
yarn add merge-deeper-object
```

```
pnpm add merge-deeper-object
```

## Usage

### ESM

```javascript
import mergeDeeper from 'merge-deeper-object';

const base = {
  server: { port: 3000, host: 'localhost' },
  features: ['auth']
};

const overrides = {
  server: { port: 8080, ssl: true },
  features: ['logging']
};

const config = mergeDeeper(base, overrides);
// {
//   server: { port: 8080, host: 'localhost', ssl: true },
//   features: ['auth', 'logging']
// }
```

### CJS

```javascript
const mergeDeeper = require('merge-deeper-object');

const result = mergeDeeper({ a: 1 }, { b: 2 });
// { a: 1, b: 2 }
```

## Testing

```
git clone git@github.com:work-state/merge-deeper-object.git
cd merge-deeper-object
npm install
npm test
```

## Compatibility

- **Node.js** >= 14
- **Browsers:** all modern browsers (ES2015+). If you need to support older browsers, configure yout bundler (Babel, SWC) to transpile `node_modules/merge-deeper-object`

## License

[MIT](https://github.com/work-state/merge-deeper-object/blob/master/LICENSE.md)

## Author

[Ilyass Mabrouk](https://github.com/work-state)
