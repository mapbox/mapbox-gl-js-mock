function Bounds(map){
  this._e = map.center.lng
  this._w = map.center.lng
  this._n = map.center.lat
  this._s = map.center.lat
}

Bounds.prototype.toArray = function() {
  return []
};

Bounds.prototype.getSouth = function() {
  return this._s
};
Bounds.prototype.getWest = function() {
  return this._w
};
Bounds.prototype.getNorth = function() {
  return this._n
};
Bounds.prototype.getEast = function() {
  return this._e
};

module.exports = Bounds;
