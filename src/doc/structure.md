# Structure

This project is organized as follows:
The homepage is a SPA called main.html --> ALIAS index.html. The Main-Site uses Requirejs to load modules and other logic on the go. To make a request to the server, an ajax call is sent to server/Route.php. Route.php evaluates the call and sends back a Response-Object. Once the Response-Object has returned, the client decides what to do with it.
