function FakeControl() { }

/* Old Control API */
FakeControl.prototype.addTo = function() {}
/* New Control API */
FakeControl.prototype.onAdd = function() {}
FakeControl.prototype.onRemove = function() {}

module.exports = {
  Map: require('./classes/map'),
  LngLat: require('mapbox-gl/src/geo/lng_lat'),
  LngLatBounds: require('mapbox-gl/src/geo/lng_lat'),
  NavigationControl: FakeControl,
  ScaleControl: FakeControl,
  AttributionControl: FakeControl,
  GeolocateControl: FakeControl
}
