var mock = require('..');
var real = require('mapbox-gl');

module.exports = {
  addMapsToTest: function(id, test) {
    console.log('creating mock', id);
    var mockMap = new mock.Map({
      container: id
    });

    console.log('creating real', id);
    var realMapDiv = document.createElement('div');
    realMapDiv.id = id;
    var body = document.getElementsByTagName('body')[0];
    body.appendChild(realMapDiv);

    var realMap = new real.Map({
      container: id
    });

    var end = test.end.bind(test);

    test.end = function() {
      body.removeChild(realMapDiv);
      end();
    }

    test.maps = {
      real: realMap,
      mock: mockMap
    }

    return test;
  }
}
