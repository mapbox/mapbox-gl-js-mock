var union = require('turf-union');
var bboxPolygon = require('turf-bbox-polygon');
var buffer = require('turf-buffer');

var Evented = require('mapbox-gl/js/util/evented');
var Camera = require('mapbox-gl/js/ui/camera');
var Transform = require('mapbox-gl/js/geo/transform');
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
  this.transform = new Transform();
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
util.extend(Map.prototype, Camera.prototype);

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

/**
 * Returns an array of features that overlap with the pointOrBox
 * Currently it does not respect queryParams
 *
 * pointOrBox: either [x, y] pixel coordinates of a point, or [ [x1, y1] , [x2, y2] ]
 */
Map.prototype.queryRenderedFeatures = function(pointOrBox, queryParams) {
  var searchBoundingBox = [];
  if (pointOrBox[0].x !== undefined) {
    // convert point into bounding box
    searchBoundingBox = [
      Math.min(pointOrBox[0].x, pointOrBox[1].x),
      Math.min(pointOrBox[0].y, pointOrBox[1].y),
      Math.max(pointOrBox[0].x, pointOrBox[1].y),
      Math.max(pointOrBox[0].x, pointOrBox[1].y)
    ]
  } else {
    // convert box in bounding box
    searchBoundingBox = [
      Math.min(pointOrBox[0][0], pointOrBox[1][0]),
      Math.min(pointOrBox[0][1], pointOrBox[1][1]),
      Math.max(pointOrBox[0][0], pointOrBox[1][0]),
      Math.max(pointOrBox[0][1], pointOrBox[1][1])
    ];
  }

  var searchPolygon = bboxPolygon(searchBoundingBox);
  var features = Object.keys(this._sources).reduce((memo, name) => memo.concat(this._sources[name].data.features), []);
  features = features.filter(feature => {
    var subFeatures = [];

    if (feature.geometry.type.startsWith('Multi')) {
      // Break multi features up into single features so we can look at each one
      var type = feature.geometry.type.replace('Multi', '');
      subFeatures = feature.geometry.coordinates.map(coords => {
        return {
          type: 'Feature',
          properties: feature.properties,
          geometry: {
            type: type,
            coordinates: coords
          }
        }
      });
    }
    else {
      subFeatures.push(feature);
    }

    // union only works with polygons, so we convert points and lines into polygons
    // TODO: Look into having this buffer match the style
    subFeatures = subFeatures.map(subFeature => {
      if (subFeature.geometry.type === 'Point' || subFeature.geometry.type === 'LineString') {
        return buffer(subFeature, .00000001, 'kilometers');
      }
      else {
        return subFeature;
      }
    });

    // if any of the sub features intersect with the seach box, return true
    // if none of them intersect with the search box, return false
    return subFeatures.some(subFeautre => {
      // union takes two polygons and merges them.
      // If they intersect it returns them merged Polygon geometry type
      // If they don't intersect it retuns them as a MultiPolygon geomentry type
      var merged = union(subFeautre, searchPolygon);
      return merged.geometry.type === 'Polygon';
    });
  });

  return features;
}
