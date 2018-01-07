"use strict";

const https = require('https');
const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const app = express();

let resultsPerPage = 10;

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

/* Serach images using a specific term and return a JSON with a few results */
app.get("/search/:term", (req, res) => {
  let apiUrl = "https://www.googleapis.com/customsearch/v1?";
  let query = "q=" + req.params.term;
  
  // Handle pagination of results
  // TODO: it looks like this parameter can't be more than 90, but I haven't found out why
  if(req.query.hasOwnProperty("offset")) {
    let page = Number(req.query.offset);
    if(page > 1) {
      // Page 1: index of first element is 1. Page 2: index of first element is 10 (with 10 elements per page)
      let firstIndex = (page - 1) * resultsPerPage;
      query += "&start=" + firstIndex;
    }
  }
  
  // Get only 10 results, search only for images, hide most NSFW stuff, and send the two parameters required to use the API
  query += `&num=${resultsPerPage}&searchType=image&safe=medium&key=${process.env.API_KEY}&cx=${process.env.CX}`;
  
  // Forward the request to Google's Search API
  // https://stackoverflow.com/questions/11826384/calling-a-json-api-with-node-js
  // https://nodejs.org/docs/latest-v6.x/api/http.html#http_http_get_options_callback
  https.get(apiUrl + query, (httpsRes) => {
    httpsRes.setEncoding("utf-8");
    let json = "";
    
    httpsRes.on("data", (chunk) => {
      json += chunk;
    });
    httpsRes.on("end", () => {
      if(httpsRes.statusCode === 200) {
        try {
          // JSON.parse could throw an exception if the data can't be parsed, the try/catch is here for that reason
          let responseObj = JSON.parse(json);
          let obj = [];
          
          // If Google found results, process the data.
          // The condition here below is necessary because if there's no results the response object will not have the "items" property.
          if(Number(responseObj.searchInformation.totalResults) !== 0) {
            // Create a new JSON object with only the data needed
            obj = responseObj.items.map((item) => ({
              link: item.link,
              snippet: item.snippet,
              context: item.image.contextLink
            }));
          }
          
          // Data for the current API call
          let historyObject = {
            term: responseObj.queries.request[0].searchTerms,
            time: new Date().toISOString()  // Represents request time like this: 2017-12-27T11:02:21.717Z
          };
          
          dbAddSearch(historyObject, res);
          
          res.json(obj);
        }
        catch(e) {
          console.log("There was an error while parsing the JSON response: ", e);
          res.status(500).json({ error: "There was an error while parsing the JSON data." });
        }
      }
      else {
        res.status(502).json({ error: "The external API responded with status code " + httpsRes.statusCode });
        console.log(json);
      }
    });
  }).on("error", (e) => {
    console.log(e);
  });
});

/* Sends a JSON representing the recednt search history */
app.get("/latest", function (request, response) {
  dbGetLatestSearches(response);
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});



/***************************
       DB FUNCTIONS
***************************/

/* The code for the connection to Mongo is different from the shorturl project because it uses a newer version of the MondoDB Node driver (3 intead of 2).
The main difference seems to be the connect() method which returns a "client" instead of the DB, even if the mongo URL includes the DB name (necessary for authentication)
Based on the examples found here -> http://mongodb.github.io/node-mongodb-native/3.0/quick-start/quick-start/ */

/** Add an element to the search history */
const dbAddSearch = function(obj, res) {
  MongoClient.connect(process.env.MONGO_URL, (err, client) => {
    if(err) {
      res.status(500).json({ error: "There was an error while connecting to MongoDB." });
    } else {
      let db = client.db("fcc-projects");
      let searches = db.collection("imgsearch");
      searches.insertOne(obj, (error, result) => {
        if (error) {
          // Very unlikely, an error here means it wasn't possible to add a record/document in the DB (or the specific collection)
          throw error;
        }
        else {
          console.log("Document inserted successfully.");
          //console.log(result);  // Show the JSON containing data on the database operation
          client.close();
        }
      });
    }
  });
}

const dbGetLatestSearches = function(res) {
  MongoClient.connect(process.env.MONGO_URL, (err, client) => {
    if(err) {
      console.log(err);
      res.status(500).json({ error: "There was an error while connecting to MongoDB." });
    } else {
      let db = client.db("fcc-projects");
      let searches = db.collection("imgsearch");
      // Return the last 10 entries in the collection (limit takes the FIRST elements)
      // https://docs.mongodb.com/manual/reference/method/cursor.sort/#return-in-natural-order
      searches.find().sort({ $natural: -1 }).limit(10).toArray((error, docs) => {
        if(error) {
          throw error;
        } else {
          console.log("Sending latest searches...");
          res.json(docs);
          client.close();
        }
      });
    }
  });
}