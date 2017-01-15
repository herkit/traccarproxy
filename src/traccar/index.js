const EventEmitter = require('events');

class TraccarClient extends EventEmitter {
  constructor(server, username, password, callback) {
    super();
    var self = this;
    var WebSocket = require('ws');
    var request = require('request'),
        url = require('url');

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
      self._cookies = response.headers['set-cookie'].reduce(function(result, cookie) {
        result['cookie'] = cookie;
        return result;
      }, {});
      var wss = new WebSocket(wsurl.format(), {
        headers: self._cookies
      })

      wss.on('message', function(data, flags) {
        self.emit('message', data);
      })

      callback(err, response, body);

    });
  }
}

module.exports = {
  Client: TraccarClient
}