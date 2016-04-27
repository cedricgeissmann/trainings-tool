This folder is to test new php technologies, without relying on the rest of the site.


DO NOT CREATE AN INDEX.PHP OR INDEX.HTML HERE!!!!!


- The php-script Route.php handels all user requests and sends them to the responsible class.
  - Route.php has to check if the user is logged in. (If the session is set for a user, he may be considered as logged in)


- Client holds a single page application.
- This application gets the data from the server in json-objects.
- The client renders the data with mustache and displays it to the user.
- Add controllers to the view when the view is loaded
