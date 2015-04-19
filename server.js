// call the packages we need
var express    = require('express');        // call express
var app = express();

var bodyParser = require('body-parser');
var sherlock = require('sherlock-inspector');
var segment = require('sherlock-segment');
var bunyan = require('bunyan');
var bsyslog = require('bunyan-syslog');

var log = bunyan.createLogger({
  name: 'waldo',
  streams: [
    {
      type: 'raw',
      stream: bsyslog.createBunyanStream({
        type: 'sys'
      })
    },
    {
      stream: process.stdout
    }
  ]
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
app.get('/v1/test', function(req, res) {
  res.json(
    {
      test: "bonk"
    }
  );
});

app.get('/v1/what', function(req, res) {
  var out;

  log.info("Making request for: " + req.query.u);
  var t = process.hrtime();

  sherlock()
    .use(segment)
    .analyze(req.query.u, function (err, results) {
      out = results;
      res.json(
        {
          url: req.query.u,
          data: out
        }
      );

      t = process.hrtime(t);
      log.info(t);
    });
});

// START THE SERVER
// =============================================================================
var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;
  console.log('Waldo listening at http://%s:%s', host, port);

});