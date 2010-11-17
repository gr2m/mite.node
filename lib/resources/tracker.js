module.exports = (function() {

  // initializer
  function Tracker(options) {
    require('../base').call(this, options);
  }
  
  // API
  Tracker.prototype.find = function(callback) {
    this.get('tracker', callback);
  };
  Tracker.prototype.start = function(id, callback) {
    this.put('tracker/'+id, callback);
  };
  Tracker.prototype.stop = function(id, callback) {
    this.delete('tracker/'+id, callback);
  };
  
  return Tracker;
})();