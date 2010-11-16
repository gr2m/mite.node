var Sys      = require('sys'),
    Resource = new require('./base');

module.exports = (function() {

  // initializer
  function Tracker(options) {
    this.init(options);
  }
  
  // Inherit from Resource
  Sys.inherits(Tracker, Resource);
  
  // API
  Tracker.prototype.find = function(callback) {
    this.get('tracker', callback);
  };
  Tracker.prototype.start = function(id, callback) {
    this.put('tracker/'+id, callback);
  };
  Tracker.prototype.stop = function(id, callback) {
    this.del('tracker/'+id, callback);
  };
  
  return Tracker;
})()