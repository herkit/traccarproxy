console.log(process.env.TRACCAR_USER);

require('./traccar')(
  process.env.TRACCAR_SERVER, 
  process.env.TRACCAR_USER, 
  process.env.TRACCAR_PASSWORD, 
  function(err, response, body) {
    console.log('test');
    if (!err) {
      console.log(response.cookies);
      console.log(response.statusCode);
      console.log(body);
    } else
      console.log(err);
  });