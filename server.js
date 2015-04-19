var express = require('express');
var bodyParser = require('body-parser');
// var sherlock = require('sherlock-inspector');
// var segment = require('sherlock-segment');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/test', function(req, res) {
  res.json({
    url: "sup dawg",
    data: out
  });
}

app.listen(8080, '0.0.0.0');
console.log('Listening on port 8080');
