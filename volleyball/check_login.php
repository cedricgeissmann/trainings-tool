<?php
/**
 * Überprüft ob sich ein Benutzer eingeloggt hat. Damit funktionen nicht einfach von aussen aufgerufen werden können.
 * Falls dies nicht der Fall ist, kommt man zum Loginscreen zurück.
 */

if(!isset($_SESSION)) {
	session_start();
}

if (!(isset($_SESSION['login'])) && $_SESSION['login']!=1) {
	header ("Location: index.php");
}
?>
