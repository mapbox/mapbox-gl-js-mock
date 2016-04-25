var Evented = require('mapbox-gl/js/util/evented');
var util = require('mapbox-gl/js/util/util');

var Style = require('./style');

var defaultOptions = {
  doubleClickZoom: true
}

var Map = module.exports = function(options) {
  this.options = util.extend(options, defaultOptions);
  this._events = {};
  this._sources = {};
  this.style = new Style();
  this._controlCorners = {
    'top-left': {
      appendChild: function() {}
    }
  }
  setTimeout(function() {
    this.fire('load');
  }.bind(this), 0);
}

util.extend(Map.prototype, Evented);

Map.prototype.addControl = function(control) {
  control.addTo(this);
}

Map.prototype.getContainer = function() {
  var container = {
    parentNode: container,
    appendChild: function() {},
    removeChild: function() {},
    getElementsByClassName: function() {
      return [container]
    },
    addEventListener: function(name, handle) {},
    removeEventListener: function(){},
    classList: {
      add: function() {},
      remove: function(){}
    }
  };

  return container;
}

Map.prototype.getSource = function(name) {};
Map.prototype.addSource = function(name, source) {};
Map.prototype.removeSource = function(name) {};

Map.prototype.addLayer = function(layer, before) {};
Map.prototype.removeLayer = function(layerId) {};

Map.prototype.getZoom = function() {};

Map.prototype.doubleClickZoom = {
  disable: function() {},
  enable: function() {}
}

Map.prototype.project = function() {}

Map.prototype.queryRenderedFeatures = function() {
  return [];
}
