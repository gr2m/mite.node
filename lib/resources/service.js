var Sys      = require('sys'),
    Resource = new require('./base');

module.exports = (function() {

  // initializer
  function Service(options) {
    this.init(options);
  }
  
  // Inherit from Resource
  Sys.inherits(Service, Resource);
  
  // API
  Service.prototype.all = function(callback) {
    this.get('services', callback);
  };
  Service.prototype.archived = function(callback) {
    this.get('services/archived', callback);
  };
  Service.prototype.find = function(id, callback) {
    this.get('services/'+id, callback);
  };
  Service.prototype.create = function(attributes, callback) {
    this.post('services', this.namespace_attributes('service', attributes), callback);
  };
  Service.prototype.update = function(id, attributes, callback) {
    this.put('services/'+id, this.namespace_attributes('service', attributes), callback);
  };
  Service.prototype.delete = function(id, callback) {
    this.del('services/'+id, callback);
  };
  Service.prototype.time_entries = function(ids, callback) {
    this.get('time_entries?service_id='+ids, callback);
  };
  
  return Service;
})()