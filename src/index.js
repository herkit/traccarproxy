console.log(process.env.TRACCAR_USER);

require('./traccar')(
  process.env.TRACCAR_SERVER, 
  process.env.TRACCAR_USER, 
  process.env.TRACCAR_PASSWORD, 
  function(err, response, body) {
    if (!err) {
      console.log(response.statusCode, body);
    } else
      console.log(err);
  });