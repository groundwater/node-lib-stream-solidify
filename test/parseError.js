var Cat = require('concat-stream');
var test = require('tap').test;
var domain = require('domain');
var solidify = require('../index.js');
var PassThrough = require('stream').PassThrough;

test("throw in handler when error parsing", function (t) {
  var d = domain.create();
  var pt = new PassThrough();

  d.on('error', function(){
    t.end();
  })
  d.run(function(){
    solidify(pt).json(function (err, txt) {
      throw new Error();
    });
  })

  pt.end('BAD');
});

test("throw in handler when parsing", function (t) {
  var d = domain.create();
  var pt = new PassThrough();

  d.on('error', function(){
    t.end();
  })
  d.run(function(){
    solidify(pt).json(function (err, txt) {
      t.ifError(err);

      throw new Error();
    });
  })

  pt.end('{}');
});

test("double json", function (t) {
  t.plan(4);

  var d = domain.create();
  var pt = new PassThrough();

  solidify(pt)
  .json(function (err, txt) {
    t.ifError(err);
    t.equal(txt.A, 'A')
  })
  .json(function (err, txt) {
    t.ifError(err);
    t.equal(txt.A, 'A')
  })

  pt.end('{"A":"A"}');
});
