"use strict";

var util = require('util');
var stream = require('stream');

//-- Solidify --//

util.inherits(Solidify, stream.Writable);
function Solidify(str, opts) {
  stream.Writable.call(this, opts);

  this.buffer = [];
  this.string = null;

  if (str) str.pipe(this);
}

Solidify.prototype.text = function (callback) {
  var buffer = this.buffer;

  this.on('finish', function CALLBACK_TEXT() {
    callback(null, this.buffer.join(''));
  });
};

Solidify.prototype.json = function (callback) {
  var buffer = this.buffer;
  this.text(function (err, text) {
    try {
      callback(null, JSON.parse(text));
    } catch (e) {
      callback(e);
    }
  });

  return this;
};

Solidify.prototype._write = function (chunk, encoding, next) {
  this.buffer.push(chunk.toString());
  next();
};

function solidify(stream) {
  return new Solidify(stream);
}

module.exports          = solidify;
module.exports.Solidify = Solidify;
