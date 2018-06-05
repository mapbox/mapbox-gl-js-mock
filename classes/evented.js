function Evented() {
  this.events = []
}

Evented.prototype.on = function (type, ...options) {
  let fn = null
  let layer = null

  if(options.length === 1) {
    fn = options[0]
  } else {
    layer = options[0]
    fn = options[1]
  }

  this.events.push({type : type, layer : layer, fn : fn})
};

Evented.prototype.off = function (type, layer) {};

Evented.prototype.once = function (type, fn) {};

Evented.prototype.listens = function (type, fn) {};

Evented.prototype.fire = function (type, layer) {
  this.events.find((event) => {
    if((layer && event.type === type && event.layer === layer) || (!layer && event.type === type)) {
      if(event.prepare) {
        event.fn(...event.prepare)
      } else {
        event.fn()
      }
    }
  })
};

Evented.prototype.getEvents = function () {
  return this.events
};

Evented.prototype.prepare = function (type, layer, ...options) {
  let event = this.events.find((event) => {
    return event.type === type && event.layer === layer
  });
  if(event) {
    event.prepare = options
  } else {
    console.error(`mapbox-mock : no event for this selector : ${type}, ${layer}`)
  }
};

module.exports = Evented;
