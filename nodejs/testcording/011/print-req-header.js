var http    = require("http");
var setting = require("./setting.js");

var server = http.createServer();

server.on("request", function(req, res) {
  res.writeHead(200);
  res.write("URL :" + req.url + "\n");
  res.write("Method :" + req.method + "\n");

  Object.keys(req.headers).forEach(function (key) {
    res.write(key + " : " + req.headers[key] + "\n");
  });
  res.end();
});

server.listen(setting.PORT, setting.IP, setting.startServer);
