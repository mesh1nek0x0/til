const http = require('http');
const setting = require('./setting');
const querystring = require('querystring');

var server = http.createServer();

var CHAT_LOG = [];
var HTML_HEAD = '\
<!DOCTYPE html>\
<html>\
<head>\
<meta charset="UTF-8">\
<title>simple chat</title>\
</head>\
';

var getHtmlBody = function(dataArray) {
  var content = '\
  <body>\
  <div>\
  <h1>simple chat</h1>\
  <h2>delete chat log, if you stop server.</h2>\
  <form method="post" action="/">\
  <label><input type="text" name="content"></label>\
  <input type="submit" value="write">\
  </form>\
  ';

  Object.keys(dataArray).forEach(function (index) {
    content += dataArray[index] + "<br />";
  });

  content += '\
  </div>\
  </body>\
  ';

  return content;
}

var HTML_FOOTER = '\
</html>\
';

server.on("request", function(req, res) {
  if (req.url !== "/") {
    res.writeHead(404, setting.HEADER);
    res.write("ERROR NOT FOUND.");
    res.end();
    return ;
  }

  if (req.method !== "POST") {
    res.writeHead(200, setting.HEADER);
    res.write(HTML_HEAD);
    res.write(getHtmlBody(CHAT_LOG));
    res.write(HTML_FOOTER);
    res.end();
    return ;
  } else {
    req.data = "";
    var tmp;
    req.on("readable", function() {
      tmp = req.read();
      if (tmp !== null) {
        req.data += tmp;
      }
    });
    req.on("end", function() {
      var query = querystring.parse(req.data);

      CHAT_LOG.push(query.content);
      res.writeHead(200, setting.HEADER);
      res.write(HTML_HEAD);
      res.write(getHtmlBody(CHAT_LOG));
      res.write(HTML_FOOTER);
      res.end();
    });
  }
});

server.listen(setting.PORT, setting.IP, setting.startServer);
