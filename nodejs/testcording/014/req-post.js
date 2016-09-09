var http = require('http');
var setting = require('./setting');
var querystring = require('querystring');

var server = http.createServer();

server.on("request", function(req, res) {
  console.log("request has come!");
  if (req.method === "POST") {
    var data = "";
    var tmp = "";
    req.on("readable", function() {
      if (tmp = req.read()) {
        console.log(tmp instanceof Buffer);
        data += tmp;
      }
    });
    req.on("end", function () {
      console.log(data);
      var query = querystring.parse(data);
      Object.keys(query).forEach(function(key) {
        console.log("key" + ":" + query[key]);
      });
    });
  }

  res.writeHead(200);
  res.write("req end.\n");
  res.end();
});

server.listen(setting.PORT, setting.IP, setting.startServer);
