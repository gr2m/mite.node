var Sys      = require('sys'),
    Resource = new require('./base');

module.exports = (function() {

  // initializer
  function Project(options) {
    this.init(options);
  }
  
  // Inherit from Resource
  Sys.inherits(Project, Resource);
  
  // API
  Project.prototype.all = function(callback) {
    this.get('projects', callback);
  };
  Project.prototype.archived = function(callback) {
    this.get('projects/archived', callback);
  };
  Project.prototype.find = function(id, callback) {
    this.get('projects/'+id, callback);
  };
  Project.prototype.create = function(attributes, callback) {
    this.post('projects', this.namespace_attributes('project', attributes), callback);
  };
  Project.prototype.update = function(id, attributes, callback) {
    this.put('projects/'+id, this.namespace_attributes('project', attributes), callback);
  };
  Project.prototype.delete = function(id, callback) {
    this.del('projects/'+id, callback);
  };
  Project.prototype.time_entries = function(ids, callback) {
    this.get('time_entries?project_id='+ids, callback);
  };
  
  return Project;
})()