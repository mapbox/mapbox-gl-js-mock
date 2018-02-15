var test = require('tape');

test('require mapboxglMock', function(t) {
  var mock = require('../');

  var map = new mock.Map();
  map.on('data', function() {
	t.pass('evented works');
	t.end();
  });
  map.fire('data');
});
