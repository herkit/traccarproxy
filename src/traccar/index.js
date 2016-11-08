var WebSocket = require('ws');
var request = require('request'),
    url = require('url');


var createClient = function(server, username, password, callback) {
  var j = request.jar();
  var wsurl = url.parse(url.resolve(server, 'api/socket'));
  wsurl.protocol = 'ws:';

  request.post({
    url: url.resolve(server, 'api/session'), 
    jar: j,
    form: { 
      email: username,
      password: password
    }
  }, function(err, response, body) {
    var cookies = response.headers['set-cookie'].reduce(function(result, cookie) {
      result['cookie'] = cookie;
      return result;
    }, {});
    console.log(cookies);
    console.log(wsurl.format());
    var wss = new WebSocket(wsurl.format(), {
      headers: cookies
    })

    wss.on('message', function(data, flags) {
      console.log(data);
    })

    callback(err, response, body);

  });
}

module.exports = createClient;