var http    = require("http");
var setting = require("./setting.js");

var server = http.createServer();

server.on("request", function(req, res) {
  res.writeHead(200);

  // if (req.url == "/") {
  //   res.write("this is top page.\n");
  // } else if (req.url == "/test") {
  //   res.write("this is test page.\n")
  // } else {
  //   res.write("404\n");
  // }
  switch (req.url) {
    case "/":
      res.write("this is top page.\n");
      break;
    case "/test":
      res.write("this is test page.\n")
      break;
    default:
      res.write("404.\n")
      break;
  }

  res.end();
});


server.listen(setting.PORT, setting.IP, setting.startServer());
