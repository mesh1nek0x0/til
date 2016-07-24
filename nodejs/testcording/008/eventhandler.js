var IP_ADDRESS = 'localhost';
var PORT       = 8080;

var startServer = function () {
  console.log("Server is running at http://" + IP_ADDRESS + ":" + PORT);
}

var http = require("http");

var server = http.createServer();

server.on("request", function (req, res) {
  console.log(req.url);
});

server.on("request", function(req, res) {
  res.writeHead(200, {"Content-Type": "text/plain"});
});

server.on("request", function(req, res) {
  res.end("hello from 008" + req.url + "\n");
});

server.listen(PORT, IP_ADDRESS, startServer);
