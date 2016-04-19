<?php

require_once "init.php";

if( isset($_POST["username"]) AND isset($_POST["password"])){
	Auth::construct_with_log_in($_POST["username"], md5($_POST["password"]));

	echo "{\"exists\": 1, \"active\": 1}";
}else{
	Auth::construct_with_log_in('test', md5('1234'));
}


//echo "<h1>This is resticeted area</h1>";




?>
