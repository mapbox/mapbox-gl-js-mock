function FakeControl() { }

/* Old Control API */
FakeControl.prototype.addTo = function() { return this; }
/* New Control API */
FakeControl.prototype.onAdd = function() {}
FakeControl.prototype.onRemove = function() {}
FakeControl.prototype._onMove = function() {}
FakeControl.prototype._updateAttributions = function() {}
FakeControl.prototype._updateEditLink = function() {}
FakeControl.prototype._updateCompact = function() {}

function FakePopup(){
  this.setLngLat = () => { return this; };
  this.setHTML = (html) => { this.html = html;return this; };
  this.remove = () => { return this; };
  this. addTo = (map) => { map.popups.push(this);return this; };
  this.getElement = () => document;
}

module.exports = {
  Map: require('./classes/map'),
  LngLat: require('mapbox-gl').LngLat,
  LngLatBounds: require('mapbox-gl').LngLatBounds,
  NavigationControl: FakeControl,
  ScaleControl: FakeControl,
  AttributionControl: FakeControl,
  Popup: FakePopup,
  Marker: FakePopup,
  GeolocateControl: FakeControl
}
