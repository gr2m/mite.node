var Sys      = require('sys'),
    Resource = new require('../resource');

module.exports = (function() {

  // initializer
  function Customer(options) {
    this.init(options);
  }
  
  // Inherit from Resource
  Sys.inherits(Customer, Resource);
  
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
  Customer.prototype.new = function(attributes, callback) {
    this.post('customers', this.namespace_attributes('customer', attributes), callback);
  };
  Customer.prototype.update = function(id, attributes, callback) {
    this.put('customers/'+id, this.namespace_attributes('customer', attributes), callback);
  };
  Customer.prototype.delete = function(id, callback) {
    this.del('customers/'+id, callback);
  };
  Customer.prototype.projects = function(ids, callback) {
    this.get('projects?customer_id='+ids, callback);
  };
  Customer.prototype.time_entries = function(ids, callback) {
    this.get('time_entries?customer_id='+ids, callback);
  };
  
  return Customer;
})()