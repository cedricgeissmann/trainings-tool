<?php 
startSession();
checkLogin();


/**
 * Starts a php-session if it is not started allready.
 */
function startSession(){
	if(!isset($_SESSION)){
		session_start();
	}
}


/**
 * Checks if a user is logged in, by checking if the session.login is set, except for the index.php.
 */
function checkLogin(){
	if (!(isset($_SESSION['login'])) && $_SESSION['login']!=1 && !preg_match("/index.php/", $_SERVER['REQUEST_URI'])) {
		header("Location: index.php");
	}
}


function checkAdmin(){
	if($_SESSION["user"]["admin"]==1){
		return true;
	}else{
		header("Location: main.php");
	}
	return false;
}

function checkTrainer(){
	if($_SESSION["user"]["trainer"]==1){
		return true;
	}else{
		header("Location: main.php");
	}
	return false;
}

?>