var envelope = require('turf-envelope');
var turfUnion = require('turf-union');
var bboxPolygon = require('turf-bbox-polygon');
var buffer = require('turf-buffer');

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

Map.prototype.getSource = function(name) {
  if (this._sources[name]) {
    return {
      setData: function(data) {
        this._sources[name].data = data;
      }.bind(this)
    };
  }
};

Map.prototype.loaded = function() {
  return true;
};


Map.prototype.addSource = function(name, source) {
  this._sources[name] = source;
};

Map.prototype.removeSource = function(name) {
  delete this._sources[name];
};

Map.prototype.addLayer = function(layer, before) {};
Map.prototype.removeLayer = function(layerId) {};

Map.prototype.getZoom = function() {};

Map.prototype.doubleClickZoom = {
  disable: function() {},
  enable: function() {}
}

Map.prototype.boxZoom = {
  disable: function() {},
  enable: function() {}
}

Map.prototype.dragPan = {
  disable: function() {},
  enable: function() {}
}

Map.prototype.project = function() {}

Map.prototype.queryRenderedFeatures = function(bbox, queryParams) {
  var tbb = [];
  if (bbox[0].x !== undefined) {
    tbb = [
      Math.min(bbox[0].x, bbox[1].x),
      Math.min(bbox[0].y, bbox[1].y),
      Math.max(bbox[0].x, bbox[1].y),
      Math.max(bbox[0].x, bbox[1].y)
    ]
  } else {
    tbb = [
      Math.min(bbox[0][0], bbox[1][0]),
      Math.min(bbox[0][1], bbox[1][1]),
      Math.max(bbox[0][0], bbox[1][0]),
      Math.max(bbox[0][1], bbox[1][1])
    ];
  }

  var bpoly = bboxPolygon(tbb);
  var features = Object.keys(this._sources).reduce((memo, name) => memo.concat(this._sources[name].data.features), []);
  features = features.filter(feature => {
      if (feature.geometry.type === 'Point') {
        feature = buffer(feature, .00000001, 'kilometers');
      }
      var fpoly = envelope({
        type: 'FeatureCollection',
        features: [feature]
      });
      var merged = turfUnion(fpoly, bpoly);
      return merged.geometry.type === 'Polygon';
    });

  return features;
}
