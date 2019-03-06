

const Marker = function(data) {
  this.latlong = null;

  this.setLngLat = function(latlong) {
    this.latlong = latlong;
    return this;
  }

  this.getLngLat = function() {
    return this.latlong;
  }

  this.setOffset = function(offset) {
    this.offset = offset;
    return this;
  }

  this.getOffset = function() {
    return this.offset;
  }

  this.addTo = function(map) {
    return this;
  }

  this.remove = function() {
    return;
  }
}

module.exports = Marker
