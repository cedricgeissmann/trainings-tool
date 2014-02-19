<?php
session_start();

if(isset($_SESSION["login"])){
	unset($_SESSION["login"]);
}
if(isset($_SESSION["user"])){
	unset($_SESSION["user"]);
}

$url = "index.php";
header("Location:$url");

?>
