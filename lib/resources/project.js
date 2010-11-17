module.exports = (function() {

  // initializer
  function Project(options) {
    require('../base').call(this, options);
  }
  
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
    this.post('projects', attributes, callback);
  };
  Project.prototype.update = function(id, attributes, callback) {
    this.put('projects/'+id, attributes, callback);
  };
  Project.prototype.delete = function(id, callback) {
    this.delete('projects/'+id, callback);
  };
  Project.prototype.time_entries = function(ids, callback) {
    this.get('time_entries?project_id='+ids, callback);
  };
  
  return Project;
})();