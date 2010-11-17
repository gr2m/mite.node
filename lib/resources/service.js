module.exports = (function() {

  // initializer
  function Service(options) {
    require('../base').call(this, options);
  }
  
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
    this.post('services', attributes, callback);
  };
  Service.prototype.update = function(id, attributes, callback) {
    this.put('services/'+id, attributes, callback);
  };
  Service.prototype.delete = function(id, callback) {
    this.del('services/'+id, callback);
  };
  Service.prototype.time_entries = function(ids, callback) {
    this.get('time_entries?service_id='+ids, callback);
  };
  
  return Service;
})()