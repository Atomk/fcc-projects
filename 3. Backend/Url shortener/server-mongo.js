/************************************************************************
    This is the same as server.js, but it uses MongoDB.
*************************************************************************/

"use strict";

let mongoClient = require("mongodb").MongoClient;
//let async_ = require("async");
let express = require('express');
let app = express();

/* IMPORTANT - You have to create your database, the "shorturls" collection and have MongoDB running */
const DB_NAME = "fcc-projects";
const DB_URL = "mongodb://localhost:27017/" + DB_NAME;
const SHORTCODE_LENGTH = 4;


// Create a sample document (or update an existing one)
//mongoUpsert("xmpl", "https://example.com/", (result) => {});


// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// Without this the app will interpret some automatic requests by browsers as if they were url shortcodes
// https://forum.freecodecamp.org/t/why-in-my-express-app-url-shortener-there-is-always-a-get-request-to-favicon-ico-what-is-this-solved/86765/2
app.get("/favicon.ico", (req, res) => {
  res.status(404);
});

app.get("/new", function (req, res) {
  // 400: Bad Request
  res.status(400).json({ error: "This route requires a parameter. Use /new/:url instead." });
});

// This has to be after /new, or "new" will be used as a parameter, as if it was a shortened url
// This means "new" cannot be a valid id for a shortened url
app.get("/:shorturl", function (req, res) {
  mongoGet(req.params.shorturl, (docs) => {
    if(docs.length > 0) {
      // Redirects the browser on the page contained in the database
      res.redirect(docs[0].url);
    } else {
      // 400: Bad Request
      res.status(400).json({ error: "There's no entry in the database with the provided id." });
    }
  });
});

// The path can be a regular expression! Normal parameters do not work because of the special characters.
app.get(/\/new\/.*/, function(req, res) {
  //console.log("Requested path:", req.path);  // /new/<parameter>
  
  let shortCode;  // Will be the code associated with the URL
  let url = req.path.substring(5);  // Keep only the parameter, not the route path
  
  if(isValidUrl(url)) {
    shortCode = generateShortCode(SHORTCODE_LENGTH);
    
    mongoUpsert(shortCode, url, (result) => {
      if(result.upsertedCount === 1 || result.matchedCount === 1) {
        res.json({
          "url-original": url, 
          // https://stackoverflow.com/a/10185427
          // Sample value for url.short -> "https://atomk-fcc-urlshortener.glitch.me/123456"
          "url-short": "https://" + req.get("host") + "/" + shortCode  // The https is hardcoded for Glitch, because req.protocol is http even on secure connections. Should see x-forwarded-for
        });
        
        if(result.upsertedCount === 1)
          console.log("New entry in the DB with code '" + shortCode + "'");
        else
          console.log("Existing document with shortcode '" + shortCode + "' updated.");
      }
      else {
        res.status(500).json({ error: "Unexpected result during database operations." });
      }
    });
  } else {
    // Respond with an error: http://expressjs.com/en/4x/api.html#res.json
    // https://httpstatuses.com/400
    res.status(400).json({ error: "The provided URL is not valid.", url: url });
  }
});

// listen for requests :)
// Uses port 3001 to avoid conflicts with MongoDB's http interface (--rest parameter)
let listener = app.listen(process.env.PORT || 3001, function () {
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

/** Finds a document containing the shortcode passed as an argument. If it is not found, inserts a new document */
function mongoUpsert(short, url, callback) {
  // https://docs.mongodb.com/getting-started/node/insert/
  mongoClient.connect(DB_URL, (err, db) => {
    if(err) throw err;
    
    let obj = { "short": short, "url": url };
    let collection = db.collection("shorturls");
    // http://mongodb.github.io/node-mongodb-native/2.0/api/Collection.html#updateOne
    collection.updateOne({ "short": short }, obj, { upsert: true }, (err, result) => {
      if(err) throw err;
      
      console.log("short: " + short + "\nurl: " + url + "\nMatched: " + result.matchedCount + "\nUpserted: " + result.upsertedCount);
      callback(result);
    });
  });
}

function mongoGet(short, callback) {
  mongoClient.connect(DB_URL, (err, db) => {
    if(err) throw err;
    
    let collection = db.collection("shorturls");
    collection.find({ "short": short }, { "_id": false }).toArray((err, docs) => {
      if(err) throw err;
      
      // docs => [ { short: 'xmpl', url: 'https://example.com/' } ]
      callback(docs);
    });
  });
}

/** Returns true if the parameter is a valid URL string */
function isValidUrl(url) {
  if(typeof url == "string") {
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
    if(matches !== null && matches[0].length === url.length)
      return true;
  }
  
  return false;
}

/* ASYNC STUFF - Tried my best but I need more knowledge and practice for this.

// I wanted to generate codes until an unused one is found, but that's not trivial with asynchronous functions.
    
// https://stackoverflow.com/a/32149740
// https://caolan.github.io/async/docs.html#until
// Calls the second function until the first function returns true. When finished, calls the third function
async_.until(
  () => {console.log("async.until test, ok = " + ok); return ok; },
  () => {  // The parameter should be the final callback, according to async docs
    shortCode = generateShortCode(SHORTCODE_LENGTH);
    mongoUpsert(shortCode, url, () => { ... })); },
  (err) => {
    if(err) {
      res.status(500).json({ error: "There was an error while operating on the database." });
      throw err;
    } else {
      res.json({
        "url-original": url, 
        // https://stackoverflow.com/a/10185427
        // Sample value for url.short -> "https://atomk-fcc-urlshortener.glitch.me/123456"
        "url-short": "https://" + req.get("host") + "/" + shortCode  // The https is hardcoded for Glitch, because req.protocol is http even on secure connections. Should see x-forwarded-for
      });
    }
  } 
); */