var IP_ADDRESS = 'localhost';
var PORT       = '8080';
var startServer = function () {
  console.log("Server is Runninng at http://" + IP_ADDRESS + ":" + PORT);
};

var http = require("http");

var server = http.createServer();

server.on('request', function (req, res) {
  console.log(req.url);
  res.writeHead(200, {"Content-Type": "text/plain"});
  res.end("hello from 007 at :" + req.url);
});


server.listen(PORT, IP_ADDRESS, startServer);
