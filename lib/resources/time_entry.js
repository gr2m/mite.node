module.exports = (function() {

  // initializer
  function TimeEntry(options) {
    require('../base').call(this, options);
  }
  
  // API
  TimeEntry.prototype.all = function(callback) {
    this.get('time_entries', callback);
  };
  TimeEntry.prototype.archived = function(callback) {
    this.get('time_entries/archived', callback);
  };
  TimeEntry.prototype.find = function(id, callback) {
    this.get('time_entries/'+id, callback);
  };
  TimeEntry.prototype.create = function(attributes, callback) {
    this.post('time_entries', attributes, callback);
  };
  TimeEntry.prototype.update = function(id, attributes, callback) {
    this.put('time_entries/'+id, attributes, callback);
  };
  TimeEntry.prototype.delete = function(id, callback) {
    this.del('time_entries/'+id, callback);
  };
  
  return TimeEntry;
})()