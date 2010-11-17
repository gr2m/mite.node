module.exports = (function() {

  // initializer
  function Customer(options) {
    require('../base').call(this, options);
  }
  
  // API
  Customer.prototype.all = function(callback) {
    this.get('customers', callback);
  };
  Customer.prototype.archived = function(callback) {
    this.get('customers/archived', callback);
  };
  Customer.prototype.find = function(id, callback) {
    this.get('customers/'+id, callback);
  };
  Customer.prototype.create = function(attributes, callback) {
    this.post('customers', attributes, callback);
  };
  Customer.prototype.update = function(id, attributes, callback) {
    this.put('customers/'+id, attributes, callback);
  };
  Customer.prototype.delete = function(id, callback) {
    this.delete('customers/'+id, callback);
  };
  Customer.prototype.projects = function(ids, callback) {
    this.get('projects?customer_id='+ids, callback);
  };
  Customer.prototype.time_entries = function(ids, callback) {
    this.get('time_entries?customer_id='+ids, callback);
  };
  
  return Customer;
})();