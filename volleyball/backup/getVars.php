<?php

session_start();
$_echoString = "name=" . $_SESSION["user"]["Name"] . 
	"&firstname=" . $_SESSION["user"]["Firstname"] .
	"&username=" . $_SESSION["user"]["username"] .
	"&trainer=" . $_SESSION["user"]["Trainer"] .
	"&admin=" . $_SESSION["user"]["Admin"] . "&";
	
echo $_echoString;

?>
