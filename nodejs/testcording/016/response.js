var http    = require('http');
var setting = require('./setting');

var server = http.createServer();

server.on("request", function(req, res) {
  res.writeHead(200, "hogeee", setting.HEADER);
  res.write("<html><body>");
  res.write("test data");
  res.write("</body></html>");
  res.end();
});

server.listen(setting.PORT, setting.IP, setting.startServer);
