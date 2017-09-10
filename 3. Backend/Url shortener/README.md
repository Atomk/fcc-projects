URL Shortener Microservice
=========================

A simple API which, given an URL, creates a shortened link to access that URL.

**Note**: the word "new" cannot be used as a shortcode for urls, so all codes are generated with 4 characters. Four alphanumeric characters means 1679616 different combinations (36^4).

- **server.js** uses a variable as a database, so data is not persistent.
- **server-mongo.js** connects to a MongoDB database. This needs a database called "fcc-projects" with a collection "shorturls". App listens on port 3001 to avoid conflicts with Mongo's http interface. If the app is loaded on localhost with https, it will not be able to redirect - use http instead.

User stories
-------------------

- I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.
- If I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.
- When I visit that shortened URL, it will redirect me to my original link.

To-do
-------------------

- [done] Use localStorage or mongoDB to make the database persistent.
- If two people shorten the same website, maybe the API should provide the same  shortcode (so no new entries are created)
- Keep track of the number of entries in the DB, to check if you're running out of available shortcodes.
- What if all available names are used?
- If there are a lot of entries in the DB it could take some time to generate a new shortcode. To mitigate that the DB could be populated with all possible combinations for shortcodes and on every request you just assign the first empty one. In this case the shortcodes should be shuffled so they are not incremental (you can't guess what the next one will be). Not sure if there are concerns for security or "seek time" though.
- Return pretty-printed JSON (https://stackoverflow.com/a/19696261, see JSON.stringify docs)