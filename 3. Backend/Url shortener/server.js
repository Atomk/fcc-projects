"use strict";

let express = require('express');
let app = express();
// TODO: use MongoDB or at least localStorage instead of this
let db = {
  "xmpl": "https://example.com/"
};
const SHORTCODE_LENGTH = 4;

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/new", function (req, res) {
  // 400: Bad Request
  res.status(400).json({ error: "This route requires a parameter. Use /new/:url instead." });
});

// This has to be after /new, or "new" will be used as a parameter, as if it was a shortened url
// This means "new" cannot be a valid id for a shortened url
app.get("/:shorturl", function (req, res) {
  if(db.hasOwnProperty(req.params.shorturl)) {
    // Redirects the browser on the page contained in the database
    res.redirect(db[req.params.shorturl]);
  } else {
    // 400: Bad Request
    res.status(400).json({ error: "There's no entry in the database with the provided id." });
  }
});

// The path can be a regular expression! Normal parameters do not work because of the special characters.
app.get(/\/new\/.*/, function(req, res) {
  //console.log("Requested path:", req.path);  // /new/<parameter>
  
  let shortCode;  // Will be the code associated with the URL
  let url = req.path.substring(5);//req.params.url.toLowerCase() || "ehi";
  /* Summary of the regexp:
     - (ftp|http[s]?)\:\/\/
       - Must start with ftp://, http:// or https://
     - ([a-z0-9]+[-a-z0-9]*[a-z0-9]+\.)+
       - Can have different parts ending with a period (.)
       - Every part must start and end with a letter or number, and can optionally contain hyphens (-)
       - Minimum: 2 letters (because the hyphen is optional)
     - [a-z]{2,}
       - TLD must be letters, at least 2
     - (\/(.+)?)?
       - After the host name you can have nothing, a slash (/) or a slash followed by anything else */
  let matches = url.match(/(ftp|http[s]?)\:\/\/([a-z0-9]+[-a-z0-9]*[a-z0-9]+\.)+[a-z]{2,}(\/(.+)?)?/);
  
  // The URL is valid if the regexp matched the entire string (first condition checks if there is a match at all)
  if(matches !== null && matches[0].length === url.length) {
    let ok = false;
    // Generate codes until you find an unused one
    while(!ok) {
      // TODO: What if all available names are used? This could be an issue in a "real" microservice.
      // With 4 alphanumeric characters you can have 1679616 different combinations (36^4)
      shortCode = generateShortCode(SHORTCODE_LENGTH); 
      if(!db.hasOwnProperty(shortCode)) {
        ok = true;
        db[shortCode] = url;
        console.log("New entry in the DB with code ", shortCode);
      }
    }
    res.json({
      "url-original": url, 
      // https://stackoverflow.com/a/10185427
      // Sample value for url.short -> "https://atomk-fcc-urlshortener.glitch.me/123456"
      "url-short": "https://" + req.get("host") + "/" + shortCode  // The https is hardcoded for Glitch, because req.protocol is http even on secure connections. Should see x-forwarded-for
    });
  } else {
    // Respond with an error:
    // http://expressjs.com/en/4x/api.html#res.json
    // https://httpstatuses.com/400
    res.status(400).json({ error: "The provided URL is not valid." });
  }
});

// listen for requests :)
let listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});




/***  FUNCTIONS ***/




/** Generates a sequence of random characters. Takes as argument the length of the sequence. */
function generateShortCode(codeLength) {
  let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMOPQRSTUVWXYZ0123456789";
  let code = new Array(codeLength);
  
  for(let i=0; i<codeLength; i++) {
    let randomCharIndex = Math.floor(Math.random()*(chars.length-1));  // chars.length-1 is the index of the last cell in the array 
    let randomChar = chars.charAt(randomCharIndex);
    code.push(randomChar);
  }
  
  // Returns a string
  return code.join("");
}