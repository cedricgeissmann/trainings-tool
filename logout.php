<?php
session_start();
include_once "server/LoggerUtil.php";

$logger = new LoggerUtil();


$logger->writeLog($_SESSION["user"]["username"], "Loggs out");


if(isset($_SESSION["login"])){
	unset($_SESSION["login"]);
}
if(isset($_SESSION["user"])){
	unset($_SESSION["user"]);
}

$url = "index.php";
header("Location:$url");

?>
