var test = require('tape');
var util = require('./util');

var control = function(_map) {
  var history = [];
  var api = {
    addTo: function(map) {
      history.push('addTo');
      history.push(map === _map);
    }
  }
  Object.defineProperty(api, 'history', {
    get: function() {
      return history.join(',');
    }
  });
  return api;
}

test('map - call addControl', function(t) {
  t = util.addMapsToTest('map', t);

  var realControl = control(t.maps.real);
  t.maps.real.addControl(realControl);

  var mockControl = control(t.maps.mock);
  t.maps.mock.addControl(mockControl);

  t.equals(realControl.history, mockControl.history);
  t.end();
});
