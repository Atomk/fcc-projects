Request Header Parser Microservice
=========================

A simple API which tells you some information about your system.

User stories
-------------------

- I can get the IP address, language and operating system for my browser.

To-do
-------------------

- Gives error if used on localhost (there's no `x-forwarded-for` field in the request)