var http = require('http');
var connect = require('connect');
var jade = require('connect-jade-static');
var path = require('path');

var jadeOptions = {
    baseDir: path.join(__dirname, '/views'),
    baseUrl: '/',
    jade: { pretty: true }
};

var app = connect()
  .use(jade(jadeOptions))
  .use(connect.logger())
  .use(connect.compress())
  .use(connect.static(__dirname + '/public'));

http.createServer(app).listen(process.env.PORT || 3000);
