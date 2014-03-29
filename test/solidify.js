var Cat = require('concat-stream');
var test = require('tap').test;
var stringify = require('lib-stream-stringify');
var solidify = require('../index.js');

test(function (t) {
  solidify(stringify("Hello World"))
  .text(function (err, txt) {
    t.equal(txt, "Hello World");
    t.end();
  });
});

test(function (t) {
  solidify()
  .json(function (err, json) {
    t.ifError(err);
    t.ok(json);
    t.end();
  })
  .end('"hello"');
});

test(function (t) {
  solidify()
  .json(function (err, json) {
    t.ifError(err);
    t.equal(json.a, 'A');
    t.end();
  })
  .end('{"a":"A"}');
});

test(function (t) {
  solidify()
  .json(function (err, json) {
    t.ok(err);
    t.end();
  })
  .end('');
});

test(function (t) {
  solidify()
  .json(function (err, json) {
    t.ifError(err);
    t.strictEqual(json, null);
    t.end();
  })
  .end('null');
});

test(function (t) {
  solidify()
  .json(function (err, json) {
    t.ifError(err);
    t.strictEqual(json, 12);
    t.end();
  })
  .end('12');
});
