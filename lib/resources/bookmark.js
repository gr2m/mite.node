module.exports = (function() {

  // initializer
  function Bookmark(options) {
    require('../base').call(this, options);
  }
  
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
})();