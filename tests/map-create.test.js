var test = require('tape');
var mock = require('../');
var real = require('mapbox-gl');

var likeKeys = function(expected, found) {
  var expectedKeys = Object.keys(expected).filter(function(key) {
    return key[0] !== '_';
  });

  var foundKeys = Object.keys(found).filter(function(key) {
    return key[0] !== '_';
  });

  var allKeys = expectedKeys.concat(foundKeys.filter(function(key) {
    return expectedKeys.indexOf(key) === -1;
  }));

  var errors = allKeys.map(function(key) {
    if(key.indexOf('Shader') !== -1 || key.indexOf('Buffer') !== -1) {
      return undefined;
    }
    var expectedType = typeof expected[key] === 'object' ? (expected[key] === null ? 'null' : 'object') : typeof expected[key];
    var foundType = typeof found[key] === 'object' ? (found[key] === null ? 'null' : 'object') : typeof found[key];
    if(expectedType !== foundType) {
      return key+': expected '+expectedType+' found '+foundType;
    }
    else if(expected[key].toString() == '[object Object]' && key != 'gl' && !Array.isArray(expected[key])) {
      var deep = likeKeys(expected[key], found[key]);
      if(deep === '') {
        return undefined;
      }
      else {
        return deep.split(', ').map(function(msg) {
          return key+'.'+msg;
        }).join(', ');
      }
    }
    return undefined;
  }).filter(function(msg) {
    return msg !== undefined;
  });

  return errors.join(', ');
}

test('create with element', function(t) {
  var mockMap = new mock.Map({
    container: document.createElement('div')
  });

  var realMap = new real.Map({
    container: document.createElement('div')
  });

  t.equals(likeKeys(realMap, mockMap), '');
  t.end();
});

test('create with id', function(t) {
  var mockMap = new mock.Map({
    container: 'mockMap'
  });

  var realMapDiv = document.createElement('div');
  realMapDiv.id = 'realMap';
  var body = document.getElementsByTagName('body')[0];
  body.appendChild(realMapDiv);

  var realMap = new real.Map({
    container: 'realMap'
  });

  t.equals(likeKeys(realMap, mockMap), '');

  body.removeChild(realMapDiv);
  t.end();
});
