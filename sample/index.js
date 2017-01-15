var traccar = require('../src/traccar');

var client = new traccar.Client(
  process.env.TRACCAR_SERVER, 
  process.env.TRACCAR_USER, 
  process.env.TRACCAR_PASSWORD, function(err, response, body) {
    if (!err) {
      console.log(response.statusCode, body);
    } else
      console.log(err);
  })

client.on('message', function(data) {
	console.log(data);
})