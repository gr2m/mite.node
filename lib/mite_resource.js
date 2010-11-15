/*!
 * mite.mize
 */

var defaults = { headers : { "User-Agent"    : 'mite.node/0.0.1'
                           , "Accept"        : "application/json"}};

module.exports = (function() {
  var Sys    = require('sys'),
      Client;
  
  /**
   * Initializer
   */
  function MiteClient(options) {
    var headers = defaults.headers;
    
    headers["host"]         = options.account + ".mite.local";
    headers["X-MiteApiKey"] = options.api_key;
    
    if (options.user_agent) headers["User-Agent"]   = options.user_agent;
    
    Client  = require('node-wwwdude').createClient({
                headers: headers
              });
  };
  
  
  /**
   * public
   */
  MiteClient.prototype = {
    myself : function(callback) {
      get('myself', callback);
    },
    account : function(callback) {
      get('account', callback);
    },
    
    users : {
      active : function(callback) {
        get('users', callback);
      },
      archived : function(callback) {
        get('users/archived', callback);
      },
      find : function(id, callback) {
        get('users/'+id, callback);
      },
      new : not_allowed,
      update : not_allowed,
      delete : not_allowed,
      
      time_entries : function(ids, callback) {
        get('time_entries?user_id='+ids, callback);
      }
    },
    
    customers : {
      active : function(callback) {
        get('customers', callback);
      },
      archived : function(callback) {
        get('customers/archived', callback);
      },
      new : function(attributes, callback) {
        post('customers', namespace_attributes('customer', attributes), callback);
      },
      find : function(id, callback) {
        get('customers/'+id, callback);
      },
      update : function(id, attributes, callback) {
        put('customers/'+id, namespace_attributes('customer', attributes), callback);
      },
      delete : function(id, callback) {
        del('customers/'+id, callback);
      },
      
      projects : function(ids, callback) {
        get('projects?customer_id='+ids, callback);
      },
      time_entries : function(ids, callback) {
        get('time_entries?customer_id='+ids, callback);
      }
    },
    
    projects : {
      active : function(callback) {
        get('projects', callback);
      },
      archived : function(callback) {
        get('projects/archived', callback);
      },
      new : function(attributes, callback) {
        post('projects', namespace_attributes('project', attributes), callback);
      },
      find : function(id, callback) {
        get('projects/'+id, callback);
      },
      update : function(id, attributes, callback) {
        put('projects/'+id, namespace_attributes('project', attributes), callback);
      },
      delete : function(id, callback) {
        del('projects/'+id, callback);
      },
      
      time_entries : function(ids, callback) {
        get('time_entries?project_id='+ids, callback);
      }
    },
    
    services : {
      active : function(callback) {
        get('services', callback);
      },
      archived : function(callback) {
        get('services/archived', callback);
      },
      new : function(attributes, callback) {
        post('services', namespace_attributes('service', attributes), callback);
      },
      find : function(id, callback) {
        get('services/'+id, callback);
      },
      update : function(id, attributes, callback) {
        put('services/'+id, namespace_attributes('service', attributes), callback);
      },
      delete : function(id, callback) {
        del('services/'+id, callback);
      },
      
      time_entries : function(ids, callback) {
        get('time_entries?service_id='+ids, callback);
      }
    },
    
    time_entries : {
      all : function(filter, callback) {
        if (!callback) {
          callback = filter;
          filter = '';
        }
        if (filter) {
          filter = '?' + params_to_string(filter);
        }
        
        get('time_entries' + filter, callback);
      },
      new : function(attributes, callback) {
        if (!callback) {
          callback = attributes;
          attributes = {};
        }
        post('time_entries', namespace_attributes('time_entry', attributes), callback);
      },
      find : function(id, callback) {
        get('time_entries/'+id, callback);
      },
      update : function(id, attributes, callback) {
        put('time_entries/'+id, namespace_attributes('time_entry', attributes), callback);
      },
      delete : function(id, callback) {
        del('time_entries/'+id, callback);
      }
    },
    
    tracker : {
      find : function(callback) {
        get('tracker', callback);
      },
      start : function(id, callback) {
        put('tracker/'+id, callback);
      },
      stop : function(id, callback) {
        del('tracker/'+id, callback);
      }
    },
    
    bookmarks : {
      all : function(callback) {
        get('time_entries/bookmarks', callback);
      },
      find : function(id, callback) {
        get('time_entries/bookmarks/'+id, callback);
      },
      new : not_allowed,
      update : not_allowed,
      delete : not_allowed,
      
      time_entries : function(id, callback) {
        get('time_entries/bookmarks/'+id+'/follow', callback);
      }
    }
  };
  
  /**
   * private
   */
  function not_allowed() {
    throw new Error('not allowed over API');
  } // not_allowed()
  function namespace_attributes(namespace, attributes) {
    var namespaced = {};
    for(key in attributes) {
     namespaced[namespace+'['+key+']'] = attributes[key]; 
    }    
    return namespaced;
  }
   
  function params_to_string(object) {
    var params = [];
    for(var i in object) {
      params.push([i, object[i]].join('='));
    }
    return params.join('&');
  };
   
  function get(path, callback) {
    Client.get('/' + path)
      .on('error', function(data, resp) {
          Sys.puts(data);
      })
      .on('success', function(data, resp) {
        data = data.replace(/^\s|\s$/,''); 
        if (!data) data = '{}';
        callback(data, resp);
      })
      .send();
  }
  function put(path, attributes, callback) {
    if (!callback) {
      callback = attributes;
      attributes = {};
    }
    var params = attributes;
    params['_method'] = 'put';
    Client.post('/' + path, params_to_string(params))
      .on('error', function(data, resp) {
          Sys.puts(data);
      })
      .on('success', function(data, resp) {
        data = data.replace(/^\s|\s$/,''); 
        if (!data) data = '{}';
        callback(data, resp);
      })
      .send();
  }
  function post(path, attributes, callback) {
    Client.post('/' + path, params_to_string(attributes))
      .on('error', function(data, resp) {
          Sys.puts(data);
      })
      .on('success', function(data, resp) {
        data = data.replace(/^\s|\s$/,''); 
        if (!data) data = '{}';
        callback(data, resp);
      })
      .send();
  }
  function del(path, callback) {
    Client.post('/' + path, params_to_string({'_method': 'delete'}))
      .on('error', function(data, resp) {
          Sys.puts(data);
      })
      .on('success', function(data, resp) {
        data = data.replace(/^\s|\s$/,''); 
        if (!data) data = '{}';
        callback(data, resp);
      })
      .send();
  }
  
  /**
   * return API
   */
  return MiteClient;
})();

