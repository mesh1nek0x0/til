const http = require('http');

var server = http.createServer();

server.on('request', function(req, res) {
  console.log('request has come!');
  res.writeHead(200);
  res.write('hello gulp x nodejs server\n');
  res.write('hello gulp x nodejs server\n');
  res.end();
});

server.listen(8080, 'localhost', function() {
  console.log('server is starting...');
});
