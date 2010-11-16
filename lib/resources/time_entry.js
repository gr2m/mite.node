var Sys      = require('sys'),
    Resource = new require('./base');

module.exports = (function() {

  // initializer
  function TimeEntry(options) {
    this.init(options);
  }
  
  // Inherit from Resource
  Sys.inherits(TimeEntry, Resource);
  
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
    this.post('time_entries', this.namespace_attributes('time_entry', attributes), callback);
  };
  TimeEntry.prototype.update = function(id, attributes, callback) {
    this.put('time_entries/'+id, this.namespace_attributes('time_entry', attributes), callback);
  };
  TimeEntry.prototype.delete = function(id, callback) {
    this.del('time_entries/'+id, callback);
  };
  
  return TimeEntry;
})()