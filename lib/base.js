var Sys    = require('sys');

/**
 * Resource Base Class
 */
module.exports = (function() {
  var Base = function(options) {
    this.client    = options.client;
    this.namespace = options.namespace;
  };
  
  Base.prototype = {
    
    // API skeleton 
    all     : not_allowed,
    create  : not_allowed,
    find    : not_allowed,
    update  : not_allowed,
    delete  : not_allowed,
    
    // show & index
    get : function(path, callback) {
      send(this.client.get('/' + path), callback)
    },
    // update
    put : function(path, attributes, callback) {
      if (!callback) {
        callback = attributes;
        attributes = {};
      }
      var params = namespace_attributes(this.namespace, attributes);
      params['_method'] = 'put';
      send(this.client.post('/' + path, params_to_string(params)), callback)
    },
    // create
    post : function(path, attributes, callback) {
      send(this.client.post('/' + path, params_to_string(namespace_attributes(this.namespace, attributes))), callback)
    },
    // delete
    del : function (path, callback) {
      send(this.client.post('/' + path, params_to_string({'_method': 'delete'})), callback)
    }
  }
  
  /* private stuff */
  function not_allowed() {
    throw new Error('not allowed over API');
  }
  // namespace {name: 'Frank'} to something like {'user[name]': 'Frank'}
  function namespace_attributes(namespace, attributes) {
    var namespaced = {};
    for(key in attributes) {
     namespaced[namespace+'['+key+']'] = attributes[key]; 
    }    
    return namespaced;
  }
  
  // JSON to URL params
  function params_to_string (object) {
    var params = [];
    for(var i in object) {
      params.push([i, object[i]].join('='));
    }
    return params.join('&');
  }
  
  function log(data) {
    Sys.puts(data);
  }
  function send(request, callback) {

    if (typeof callback == 'undefined') {
      request.on('complete', log)
             .on('error', log)
             .send();
      return;
    }
    if (typeof callback == 'function') {
      request.on('complete', function(data, resp) {
                    data = data.replace(/^\s|\s$/,''); 
                    if (data) data = JSON.parse(data);
                    callback(data, resp);
                  })
             .on('error', log)
             .send();
      return;
    }
    
    request.on('error',    callback['error']    || log)
           .on('success',  callback['success']  || log)
           .on('redirect', callback['redirect'] || log)
           .on('complete', callback['complete'] || log)
           .send();
  }
  
  return Base;
})()