var http    = require("http");
var setting = require("./setting.js");

var server = http.createServer();

server.on("request", function(req, res) {
  console.log(req.url);
});

server.on("request", function(req, res) {
  res.writeHead(200, {"Content-Type": "text/plain"});
});

server.on("request", function(req, res) {
  res.end("hello from 009 @" + req.url);
});

server.listen(setting.PORT, setting.IP, setting.startServer);
