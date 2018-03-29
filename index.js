function FakeControl() { }

/* Old Control API */
FakeControl.prototype.addTo = function() {}
/* New Control API */
FakeControl.prototype.onAdd = function() {}
FakeControl.prototype.onRemove = function() {}

function FakePopup(){
    this.setLngLat = () => {};
    this.setHTML = () => {};
    this.remove = () => {};
    this. addTo = () => {};
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
