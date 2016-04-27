<?php

require_once __DIR__ . "/init.php";

/**
 * This script will be called to route to a server side function.
 *
 * Input:
 * This script takes a request-object as input.
 *
 * Output:
 * This script generates a response-object that will be returned to the server.
 */


// Build an empty response object, which will be returned to the client when finished.
$res = new ArrayResponse();
// Build a new request-object only with the data in post
$req = new Request();



// Add some data to the response here
$router = new Router();
$result = $router->call_serverside_function($req->get_class_name(), $req->get_function_name(), $req->get_args());


$res->add_data("result", $result);



// Return the final response-object to the client
echo $res->output_response();

?>
