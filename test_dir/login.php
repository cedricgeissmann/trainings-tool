<?php

require_once "init.php";

if( isset($_POST["username"]) AND isset($_POST["password"])){
	Auth::login($_POST["username"], md5($_POST["password"]));

	echo "{\"exists\": 1, \"active\": 1}";
}else{
	Auth::login('test', md5('1234'));
}


?>
