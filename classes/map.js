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
  return {
    appendChild: function() {},
    addEventListener: function(name, handle) {},
    classList: {
      add: function() {},
      remove: function(){}
    }
  };
}

Map.prototype.getSource = function(name) {}

Map.prototype.doubleClickZoom = {
  disable: function() {},
  enable: function() {}
}

Map.prototype.project = function() {}

Map.prototype.batch = function() {}

Map.prototype.featuresAt = function() {}
