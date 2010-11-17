var Sys      = require('sys'),
    fs       = require('fs'),
    defaults = { headers : { "User-Agent"    : 'mite.node/0.0.1'
                           , "Accept"        : "application/json"}};

module.exports = (function() {

  // initializer
  function Resources(options) {
    var headers = defaults.headers;

    headers["host"]         = options.account + ".mite.local";
    headers["X-MiteApiKey"] = options.api_key;

    if (options.user_agent) headers["User-Agent"]   = options.user_agent;

    this.client  = require('node-wwwdude').createClient({headers: headers});
    this.load_resources(__dirname + '/resources/')
  }
  
  // load all resources
  Resources.prototype.load_resources = function(path) {
    var BaseClass = require(__dirname + '/base'),
        files     = fs.readdirSync(path),
        file, ResourceClass;        
    
    while(file = files.shift()) {
      ResourceClass = require(path+file);
      
      // inherit from base.js
      ResourceClass.prototype.__proto__ = BaseClass.prototype;

      
      if(ResourceClass.name) this[ResourceClass.name] = new ResourceClass({
        client    : this.client,
        namespace : file.replace(/\.js$/, '')
      })
    }
  } 
  
  return Resources;
})()