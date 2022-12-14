'use strict';
// https://github.com/tc39/proposal-iterator-helpers
var $ = require('../internals/export');
var iterate = require('../internals/iterate');
var aCallable = require('../internals/a-callable');
var getIteratorDirect = require('../internals/get-iterator-direct');

$({ target: 'Iterator', proto: true, real: true, forced: true }, {
  find: function find(fn) {
    var record = getIteratorDirect(this);
    var counter = 0;
    aCallable(fn);
    return iterate(record, function (value, stop) {
      if (fn(value, counter++)) return stop(value);
    }, { IS_RECORD: true, INTERRUPTED: true }).result;
  }
});
