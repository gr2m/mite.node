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
    get     : function(path, params, callback) {
      if (typeof callback == 'undefined') {
        send(this.client.get('/' + path), params)
        return
      }
      
      send(this.client.get('/' + [path,params_to_string(flatten_json(params))].join('?')), callback)
    },
    // update
    put     : function(path, attributes, callback) {
      if (!callback) {
        callback = attributes;
        attributes = {};
      }
      var params = namespace_attributes(this.namespace, attributes);
      send(this.client.put('/' + path, params), callback)
    },
    // create
    post    : function(path, attributes, callback) {
      send(this.client.post('/' + path, namespace_attributes(this.namespace, attributes)), callback)
    },
    // delete
    delete  : function (path, callback) {
      send(this.client.delete('/' + path), callback)
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
  
  // [TODO] DRY me
  function flatten_json(json) {
    var nj = {},
        walk = function(j, namespace){
            var jp;
            for(var prop in j){
                jp = j[prop];
                    if (namespace) {
                      prop = namespace+'['+prop+']'
                    }
                if(jp.toString() === "[object Object]"){
                    walk(jp, prop);
                }else{ 
                    nj[prop] = jp;
                }
            }
        };
    walk(json);
    return nj;
  }
  // [TODO] DRY me
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
    // error always wants to have a handler
    request.on('error', function() {})
    if (typeof callback == 'undefined') {
      request.on('complete', log)
             .on('error', log)
             .send();
      return;
    }
    if (typeof callback == 'function') {
      request.on('complete', function(data, resp) {
                    callback(data, resp);
                  })
             .on('error', log)
             .send();
      return;
    }
    for(event in callback) {
      request.on(event, callback[event])
    }
    request.send();
  }
  
  return Base;
})()