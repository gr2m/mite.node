var defaults = { headers : { "User-Agent"    : 'mite.node/0.0.1'
                           , "Accept"        : "application/json"}};

/**
 * Resource BaseClass
 */
module.exports = (function() {
  var Sys    = require('sys');
      
  Resource = function() {};
  
  Resource.prototype = {
    
    // initialize Resource
    init : function(options) {
      var headers = defaults.headers;

      headers["host"]         = options.account + ".mite.local";
      headers["X-MiteApiKey"] = options.api_key;

      if (options.user_agent) headers["User-Agent"]   = options.user_agent;

      this.client  = require('node-wwwdude').createClient({headers: headers});
    },
    
    // api skeleton 
    all : not_allowed,
    new : not_allowed,
    find : not_allowed,
    update : not_allowed,
    delete : not_allowed,
    
    // namespace {name: 'Frank'} to something like {'user[name]': 'Frank'}
    namespace_attributes : function(namespace, attributes) {
      var namespaced = {};
      for(key in attributes) {
       namespaced[namespace+'['+key+']'] = attributes[key]; 
      }    
      return namespaced;
    },
    
    // JSON to URL params
    params_to_string : function (object) {
      var params = [];
      for(var i in object) {
        params.push([i, object[i]].join('='));
      }
      return params.join('&');
    },
    
    
    get : function(path, callback) {
      this.client.get('/' + path)
        .on('error', on_error)
        .on('success', function(data, resp) {
          data = data.replace(/^\s|\s$/,''); 
          if (data) data = JSON.parse(data);
          callback(data, resp);
        })
        .send();
    },
    put : function(path, attributes, callback) {
      if (!callback) {
        callback = attributes;
        attributes = {};
      }
      var params = attributes;
      params['_method'] = 'put';
      this.client.post('/' + path, this.params_to_string(params))
        .on('error', on_error)
        .on('success', function(data, resp) {
          data = data.replace(/^\s|\s$/,''); 
          if (data) data = JSON.parse(data);
          callback(data, resp);
        })
        .send();
    },
    post : function(path, attributes, callback) {
      this.client.post('/' + path, this.params_to_string(attributes))
        .on('error', on_error)
        .on('success', function(data, resp) {
          data = data.replace(/^\s|\s$/,''); 
          if (data) data = JSON.parse(data);
          callback(data, resp);
        })
        .send();
    },
    del : function (path, callback) {
      this.client.post('/' + path, this.params_to_string({'_method': 'delete'}))
        .on('error', on_error)
        .on('success', function(data, resp) {
          data = data.replace(/^\s|\s$/,''); 
          if (data) data = JSON.parse(data);
          callback(data, resp);
        })
        .send();
    }
  }
  
  /* private stuff */
  function not_allowed() {
    throw new Error('not allowed over API');
  }
  function on_error(data, resp) {
    Sys.puts(data);
  }
  
  return Resource;
})()