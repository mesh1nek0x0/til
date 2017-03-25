const express = require('express');
const converter = require('./converter');

var app = express();

app.get('/rgb2Hex', function (req, res) {
  var red = parseInt(req.query.red, 10);
  var green = parseInt(req.query.green, 10);
  var blue = parseInt(req.query.blue, 10);
  
  var hex = converter.rgb2Hex(red, green, blue);
  
  res.send(hex);
});

app.get('/hex2Rgb', function (req, res) {
  var hex = req.query.hex;
  
  var rgb = converter.hex2Rgb(hex);
  
  res.send(JSON.stringify(rgb));
});

app.listen(3000);