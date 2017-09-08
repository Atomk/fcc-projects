Timestamp Microservice
=========================

A simple timestamp conversion API, from natural language to numbers and vice-versa.

Timestamps values must be provided in milliseconds, or you'll get wrong dates! If the conversion gives unexpected results try to add three zeros at the end of your timestamp.

User stories
-------------------

- I can pass a string as a parameter, and it will check to see whether that string contains a unix timestamp or a natural language date (example: January 1, 2016).
- If it does, it returns both the Unix timestamp and the natural language form of that date.
- If it does not contain a date or Unix timestamp, it returns null for those properties.