"use strict";

let express = require("express");
let app = express();
const PORT = 8080;
const DATE_OPTIONS = { year: 'numeric', month: 'long', day: 'numeric' };

app.get("/", function(req, res) {
	res.sendFile(__dirname + "/index.html");
});

app.get("/:time", function(req, res) {
	console.log(req.params);
	
	let date;
	let timestamp = Number(req.params.time);	// The parameter is stored as a string, but it needs to be a number
	
	if(!isNaN(timestamp)) {						// If the parameter is a valid number (meaning the conversion was successful)
		timestamp *= 1000;
		date = new Date(timestamp);
	} else {
		date = new Date(req.params.time);
	}
	
	if(  !isNaN(date.getTime())  ) {			// If the Date constructor was able to parse the parameter
		res.json({
			"unix": date.getTime(),
			"natural": date.toLocaleDateString('en-US', DATE_OPTIONS)
		});
	} else {
		// The parameter could not be converted into a valid date, return an error
		res.json({
			"unix": null,
			"natural": null
		});
	}
});

app.listen(PORT);
console.log("Server listening on port " + PORT);