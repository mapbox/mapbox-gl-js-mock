

const Marker = function(data) {
  this.latlong = null;

  this.setLngLat = function(latlong) {
    this.latlong = latlong;
    return this;
  }

  this.getLngLat = function() {
    return this.latlong;
  }

  this.addTo = function(map) {
    return this;
  }

  this.remove = function() {
    return;
  }
}

module.exports = Marker
