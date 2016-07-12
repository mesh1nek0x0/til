var http = require("http");
http.createServer(function (req, res) {
   res.writeHead(200, {"Content-Type": "text/plain"});
   res.end("hello from 002\n");
}).listen(8080, "localhost", function() {
    console.log("Server runninng at http://localhost:8080");
});
