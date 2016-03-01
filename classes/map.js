var LngLat = require('mapbox-gl/js/geo/lng_lat');
var Transform = require('mapbox-gl/js/geo/transform');
var Evented = require('mapbox-gl/js/util/evented');
var util = require('mapbox-gl/js/util/util');
var Point = require('point-geometry');

var Map = module.exports = function(options) {
    var MockBrowser = require('mock-browser').mocks.MockBrowser;
    var mock = new MockBrowser();
    this._fakeDoc = mock.getDocument();

    this.transform = new Transform(0, 22);
    this.options = options;

    this._controlCorners = {
        'top-left': this._fakeDoc.createElement('div')
    }

    this.animationLoop = {
        n: 0,
        times: {}
    };
    this.onError = function() {};
    this.painter = {
        gl: {},
        transform: this.transform,
        reusableTextures: {},
        preFbos: {},
        frameHistory: {
            frameHistory: {}
        },
        identityMatrix: {},
        backgroundBuffer: {},
        tileExtentBuffer: {},
        debugBuffer: {},
        debugTextBuffer: {},
        numSublayers: 0,
        depthEpsilon: 0,
        width: 0,
        height: 0
    };
    this.scrollZoom = {};
    this.boxZoom = {};
    this.dragRotate = {};
    this.dragPan = {};
    this.keyboard = {};
    this.doubleClickZoom = {};
    this.touchZoomRotate = {};
    this.interaction = {};
    this.sources = {};
    this.stacks = {};
    this.style = {
        loaded: function() {
            return true;
        }
    }
    setTimeout(function() {
        this.fire('load');
    }.bind(this), 20);
}

util.extend(Map.prototype, Evented);

Map.prototype.remove = function() { return this; };
Map.prototype.resize = function() { return this; };
Map.prototype.jumpTo = function() { return this; };
Map.prototype.setLayoutProperty = function() { };
Map.prototype.setPaintProperty = function() { };
Map.prototype.setStyle = function() { };
Map.prototype.setView = function() { };
Map.prototype.getZoom = function() { return 0; };
Map.prototype.getBearing = function() { return 0; };
Map.prototype.getPitch = function() { return 0; };
Map.prototype.getCenter = function() {
    return {
        lat: 0,
        lng: 0,
        toArray: function() { return [0, 0]; }
    };
};
Map.prototype.getBounds = function() {
    return {
        _sw: { lat: 85.0511, lng: 180 },
        _ne: { lat: -85.0511, lng: -180 },
        toArray: function() { return [-180, -85.0511, 180, 85.0511]; }
    };
};
Map.prototype.featuresAt = function(point, opts, cb) {
    cb([]);
};

Map.prototype.addControl = function(control) {
    control.addTo(this);
}

Map.prototype.getContainer = function() {
    if(this._fakeContainer === undefined && typeof this.options.container === 'string') {


        this._fakeContainer = this._fakeDoc.createElement('div');
        this._fakeContainer.id = this.options.container;

        this._fakeContainer.addEventListener = function() {
            console.log('addEventListener', arguments);
        }
    }
    else if (this._fakeContainer === undefined) {
        this._fakeContainer = this.options.container;
    }

    return this._fakeContainer;
}

Map.prototype.batch = function(batch) {
    batch(this);
}

Map.prototype.addLayer = function(layer) {
    this._layers = this._layers || {};
    this._layers[layer.id] = layer;

}

Map.prototype.addSource = function(name, options) {
    var me = {
        options: options,
        data: options.data,
        setData: function(data) {
            me.data = data;
        }
    }
    this.sources[name] = me;
}

Map.prototype.getSource = function(id) {
    return this.sources[id];
}

Map.prototype.project = function(lnglat) {
    return this.transform.locationPoint(LngLat.convert(lnglat));
}

Map.prototype.unproject = function(point) {
    console.log('point', point);
    return this.transform.pointLocation(Point.convert(point));
}
