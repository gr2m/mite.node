var Sys      = require('sys'),
    Resource = new require('../resource');

module.exports = (function() {

  // initializer
  function Bookmark(options) {
    this.init(options);
  }
  
  // Inherit from Resource
  Sys.inherits(Bookmark, Resource);
  
  // API
  Bookmark.prototype.all = function(callback) {
    this.get('time_entries/bookmarks', callback);
  };
  Bookmark.prototype.find = function(id, callback) {
    this.get('time_entries/bookmarks/'+id, callback);
  };
  Bookmark.prototype.time_entries = function(id, callback) {
    this.get('time_entries/bookmarks/'+id+'/follow', callback);
  };
  
  return Bookmark;
})()