/*!
 * mite.mize
 */

var Sys = require('sys'),
    HttpClient = require('node-wwwdude');

var client = HttpClient.createClient({
               headers: { 'User-Agent': 'mite.mize/0.0.1' },
             });