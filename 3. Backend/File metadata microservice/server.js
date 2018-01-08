"use strict";

let express = require('express');
let app = express();

// A package used to process "multipart/form-data" uploads
let multer = require('multer');
// Calling multer() without parameters will keep the uploaded file in memory without writing it to disk.
let upload = multer();

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// This middleware adds a "file" object to the "request" object.
// request.file will contain info about the file named "clientFile" in the form that sent it.
app.use("/upload", upload.single("clientFile"));
app.post("/upload", function (request, response) {
  //response.json(request.file);
  response.json({ "name": request.file.originalname, "size": request.file.size });
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
