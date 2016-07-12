var http = require("http");

http.createServer(function (req, res) {
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("hello world from local nodejs\n");
}).listen(8080, "localhost");
