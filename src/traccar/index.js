var WebSocketClient = require('websocket').client;
var WebSocketServer = require('websocket').server;
var request = require('request'),
    url = require('url');


var createClient = function(server, username, password, callback) {
  var j = request.jar();
  request.post({
    url: url.resolve(server, 'api/session'), 
    jar: j,
    form: { 
      email: username,
      password: password
    }
  }, function(err, response, body) {
    var cookiePath = url.resolve(server, "api");
    console.log("Server:", cookiePath);
    var cookies = j.getCookies(cookiePath);
    //var cookies = j.getCookies();
    console.log("Cookies:", cookies);
    callback(err, response, body);
  });
}

module.exports = createClient;