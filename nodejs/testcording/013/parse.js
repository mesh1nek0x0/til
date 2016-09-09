var http    = require("http");
var url     = require("url");
var setting = require('./setting');

var server = http.createServer();

server.on("request", function(req, res) {
  res.writeHead(200);;

  var parsedUrl = url.parse("http://" + setting.IP + ":" + setting.PORT + req.url, true, true);

  Object.keys(parsedUrl).forEach(function (key) {
    if (typeof parsedUrl[key] === "object") {
        console.log(parsedUrl[key]);
    } else {
      console.log(key + " : " + parsedUrl[key]);
    }
  });

  switch (parsedUrl.pathname) {
    case "/":
      res.write("top.");
      break;
    case "/test":
      res.write("test.");
      break;
    default:
      res.write("404.");
      break;
  }

  res.end();
});

server.listen(setting.PORT, setting.IP, setting.startServer);
