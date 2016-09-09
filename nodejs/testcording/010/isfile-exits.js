var http = require("http");

var path;
try {
  path = require.resolve("./configs.js");
  var config = require(path);
} catch (e) {
  var config = {
    "IP": "localhost",
    "PORT": 4343,
    startServer: function() {
      console.log("default startServer...");
    }
  }
}

var server = http.createServer();

server.on("request", function(req, res) {
  console.log(req.url);
});

server.on("request", function(req, res) {
  res.writeHead(200, {"Content-Type": "text/plain"});
});

server.on("request", function(req, res) {
  res.end("helo from 010@" + req.url);
});

server.listen(config.PORT, config.IP, config.startServer);
