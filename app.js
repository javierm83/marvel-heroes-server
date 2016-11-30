// Api server start
// Todo: separate client and backend servers , maybe in two docker instances?
var express = require('express');
var app = express();
var api = require('marvel-api');
var url = require('url');


// Todo: save keys in private file
var marvel = api.createClient({
  publicKey: '1ba474fbeabaca9d79a7200993d0ef64',
  privateKey: '5c908b328c1aebf7d80cf2d817c3da98f3e94309'
});

// Todo: clean this, add credentials for client app
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get('/characters/:start', function (req, res) {
  // Todo: if start undefined = 0 not working, fix!
  var start = req.params.start ? req.params.start : 0;
  marvel.characters.findAll(20, start, function(err, results) {
  if (err) {
    return console.error(err);
  }

  res.json(results.data);
});
});

app.listen(3000, function () {
  console.log('Example app listening on port 3003!');
});
