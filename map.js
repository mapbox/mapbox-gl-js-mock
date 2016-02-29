var Map = module.exports = function(options) {
    this.transform = {
        bearing: 0,
        center: { lat: 0, lng: 0 },
        zoom: 0,
        tileSize: 0,
        latRange: {},
        width: 0,
        height: 0,
        scale: 0,
        tileZoom: 0,
        zoomFraction: 0,
        projMatrix: {},
        angle: 0,
        exMatrix: {}
    };
    this.options = options;
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
}

Map.prototype.on = function() { return this; };
Map.prototype.off = function() { return this; };
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
