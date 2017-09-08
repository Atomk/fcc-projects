"use strict";

let express = require('express');
let app = express();

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/whoami", function(req, res) {
  // According to Express docs, "the req object is an enhanced version of Node’s own request object and supports all built-in fields and methods"
  // http://expressjs.com/it/api.html#req
  // https://nodejs.org/api/http.html#http_class_http_incomingmessage
  
  // To see the request headers -> console.log(req.headers);
  
  // Find a pattern starting with a round bracket, and go on until you find a closing round bracket (this will not be included)
  let matches = req.headers["user-agent"].match(/[(][^)]+/);
  // Take the pattern matched with the regexp and remove the opening round bracket
  let userAgent = matches[0].substring(1);
  // Info about user-agent format -> https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent
  
  let obj = {
    ipaddress: req.headers["x-forwarded-for"].split(",")[0],  // IPs are in a string separated by commas, take only the first IP
    language: req.headers["accept-language"].split(",")[0],   // Like above, take only the first accepted language
    software: userAgent
  };
  
  res.json(obj);
});

// listen for requests :)
let listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});