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
  
  Resources.prototype.load_resources = function(path) {
    var files = fs.readdirSync(path);        
    while(file = files.shift()) {
      resourceClass = require(path +file);
      if(resourceClass.name) this[resourceClass.name] = new resourceClass(this.client);
    }
  } 
  
  return Resources;
})()