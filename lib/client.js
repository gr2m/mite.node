var Sys            = require('sys'),
    fs             = require('fs'),
    Http           = require('http'),
    Url            = require('url'),
    EventEmitter   = require('events').EventEmitter,
    BaseClass      = require('./base');

var defaultHeaders = { 'User-Agent' : 'mite.node'
                     , "Accept"     : "application/json"},
    defaultLogger  = { debug:  Sys.puts
                     , info:   Sys.puts
                     , fatal:  Sys.puts
                     , error:  Sys.puts
                     , warn:   Sys.puts};

module.exports = function(options) {
  // setup headers
  var headers = { 'host'          : options.account + ".mite.local"
                , 'X-MiteApiKey'  : options.api_key};
  if (options.user_agent) headers["User-Agent"]   = options.user_agent;

  // get client
  this.client  = createClient({headers: headers});
  
  // load all resources
  var path   = __dirname + '/resources/',
      files  = fs.readdirSync(path),
      file, ResourceClass;        
  
  while(file = files.shift()) {
    ResourceClass = require(path+file);
    
    // inherit from base.js
    ResourceClass.prototype.__proto__ = BaseClass.prototype;

    // this will skip base.js
    if(ResourceClass.name) this[ResourceClass.name] = new ResourceClass({
      client    : this.client,
      namespace : file.replace(/\.js$/, '')
    });
  }
};


function createClient(clientOptions) {
  clientOptions = clientOptions || {};

  var logger        = clientOptions.logger   || defaultLogger,
      encoding      = clientOptions.encoding || 'utf8',
      clientHeaders = mergeAttributes(defaultHeaders, clientOptions.headers);

  function Request(method, url, options) {
    var self      = this,
        parsedUrl = parseURL(url);

    this.method          = method;
    this.url             = url;
    this.options         = options;
    options.headers.host = clientHeaders.host;
    
    this.client          = Http.createClient(parsedUrl.port, clientHeaders.host);
    
    if (options.payload) {
      options.headers['Content-Length'] = options.payload.length;
      this.request = this.client.request(method, parsedUrl.path, options.headers);
      this.request.write(options.payload, encoding);
    } else {
      logger.debug('Generating request');
      this.request = this.client.request(method, parsedUrl.path, options.headers);
    }

    this.request.addListener('response', function (response) { 
      self._responseHandler(response);
    });
  }

  // Inherit from EventEmitter
  Sys.inherits(Request, EventEmitter);

  /**
   * Execute a prepared HTTP request
   */
  Request.prototype.send = function () {
    logger.debug('Sending request');
    this.request.end();
  };


  /**
   * Emit events based on HTTP status codes
   */
  Request.prototype._handleResponse = function (response) {
    var code = response.statusCode,
        data = response.rawData;
    
    logger.info('Got response with code: ' + code);
    
    switch (true) {
      case code >= 400:
        logger.error("Error: status code " + response.statusCode);
        this._respond('error', data, response);
        break;
      case code === 301 || code === 302:
        this._redirect(response);
      case code >= 300:
        this._respond('redirect', data, response);
        break;
      case code >= 200:
        logger.info('Transfer complete');
        this._respond('success', data, response);
    }

    this._respond('complete', data, response);
  };

  /**
   * Handle Response
   */
  Request.prototype._responseHandler = function (response) {
    var data = '', 
        self = this;

    response.setEncoding(encoding);
    logger.debug('Headers : ' + Sys.inspect(response.headers));

    response.addListener('data', function (chunk) { data += chunk; });
    response.addListener('end',  function () {
      response.rawData = data;
      self._handleResponse(response);
    });
  };

  /**
   * handle redirects
   */
  Request.prototype._redirect = function (response) {
    if (clientOptions.followRedirect !== false) {
      var nextLocation = Url.resolve(this.url, response.headers.location);
      logger.info("Redirecting to next URL: " + nextLocation);
      this.options.originalRequest = this;
      (new Request(this.method, nextLocation, this.options).send());
    }
  };
  
  /**
   * Respond to events of responses or redirect responses
   */
  Request.prototype._respond = function (type, data, response) {
    if (this.options.originalRequest) {
      this.options.originalRequest.emit(type, data, response);
    } else {
      this.emit(type, data, response);
    }
  };

  /**
   * Parse an URL an add some needed properties
   */
  function parseURL(url) {
    var parsedUrl = Url.parse(url),
        container = {};

    container.port        = parsedUrl.port      || ((parsedUrl.protocol === 'https') ? 443 : 80);
    container.queryparms  = parsedUrl.query     ? '?' + parsedUrl.query :  '';
    container.hash        = parsedUrl.hash      || '';
    container.path        = (parsedUrl.pathname || '/') + container.queryparms + container.hash;

    return mergeAttributes(parsedUrl, container);
  };
  
  /**
   * merge to hashes
   */
  function mergeAttributes(defaults, custom) {
    if (!custom) {
      return defaults;
    }

    Object.keys(custom).forEach(function (key) {
      defaults[key] = custom[key]; 
    });

    return defaults;
  };
  
  /**
   * JSON to URL params
   */
  function params_to_string (object) {
    var params = [];
    for(var i in object) {
      params.push([i, object[i]].join('='));
    }
    return params.join('&');
  }

  // return the actual API
  return {
    get: function (url, requestHeaders) {
      var headers = mergeAttributes(clientHeaders, requestHeaders);
      return new Request('GET', url, { headers: headers });
    },

    post: function (url, payload, requestHeaders) {
      var headers = mergeAttributes(clientHeaders, requestHeaders);
      return new Request('POST', url, { headers: headers, payload: params_to_string(payload) });
    },

    put: function (url, payload, requestHeaders) {
      var headers = mergeAttributes(clientHeaders, requestHeaders);
      payload['_method'] = 'put';
      return new Request('POST', url, { headers: headers, payload: params_to_string(payload) });
    },
    
    delete: function (url, payload, requestHeaders) {
      var headers = mergeAttributes(clientHeaders, requestHeaders);
      return new Request('POST', url, { headers: headers, payload: params_to_string({'_method': 'delete'}) });
    }
  };
};