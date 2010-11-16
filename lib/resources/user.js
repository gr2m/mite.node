var Sys      = require('sys'),
    Resource = new require('../resource');

module.exports = (function() {

  // initializer
  function User(options) {
    this.init(options);
  }
  
  // Inherit from Resource
  Sys.inherits(User, Resource);
  
  // API
  User.prototype.all = function(callback) {
    this.get('users', callback);
  }
  User.prototype.archived = function(callback) {
    this.get('users/archived', callback);
  },
  User.prototype.find = function(id, callback) {
    this.get('users/'+id, callback);
  },
  User.prototype.time_entries = function(ids, callback) {
    this.get('time_entries?user_id='+ids, callback);
  }
  
  return User;
})()