var http = require('http');
var connect = require('connect');

var app = connect()
  .use(connect.logger())
  .use(connect.compress())
  .use(connect.static(__dirname + '/public'));

http.createServer(app).listen(process.env.PORT || 3000);
