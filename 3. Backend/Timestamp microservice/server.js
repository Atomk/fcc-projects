"use strict";

let express = require('express');
let app = express();

// Settings for the output format of the toLocaleString() function
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString
const DATE_OPTIONS = { year: "numeric", month: "long", day: "numeric" };

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/:time", function(req, res) {
  let obj = { unix: null, natural: null }; 
  
  let timestamp = Number(req.params.time);          // If the parameter can be converted to a number, the variable will contain that number (truthy). If not it will be NaN
                                                    // https://developer.mozilla.org/it/docs/Web/JavaScript/Reference/Global_Objects/Number 
  let timestampDate = Date.parse(req.params.time);  // If the parameter is a valid date string, timestampDate will be a timestamp value. If not, will be NaN
  
  if(!isNaN(timestamp)) {
    //timestamp *= 1000;  // Because FCC examples use timestamps in seconds, but Date works with milliseconds.
                        // Proof: console.log(new Date(1450137600)) will output a date with year 1970, but it should be 2015, so this means the parameter is a value in seconds
    obj.unix = timestamp;
    obj.natural = new Date(timestamp).toLocaleString("en-Us", DATE_OPTIONS);
  }
  else if(!isNaN(timestampDate)) {
    obj.unix = timestampDate;
    obj.natural = new Date(timestampDate).toLocaleString("en-Us", DATE_OPTIONS);
  }
  
  res.json(obj);
});

// listen for requests :)
let listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});