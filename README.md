# lib-stream-solidify

## install

```bash
npm install --save lib-stream-solidify
```

## usage

solidify a stream

```javascript
var solidify = require('lib-stream-solidify');

solidify(process.stdin).json(function (err, obj) {
  // obj is deserialized
});
```
