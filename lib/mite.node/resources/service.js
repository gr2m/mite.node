module.exports = (function() {

  // initializer
  function Service(options) {
    require('./base').call(this, options);
  }
  
  // API
  Service.prototype.all = function(params, callback) {
    this.get('services', params, callback);
  };
  Service.prototype.archived = function(params, callback) {
    this.get('services/archived', params, callback);
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
    this.delete('services/'+id, callback);
  };
  Service.prototype.time_entries = function(ids, callback) {
    this.get('time_entries?service_id='+ids, callback);
  };
  
  return Service;
})();