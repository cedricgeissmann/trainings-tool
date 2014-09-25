<?php

include "check_login.php";
include "DatabaseUtil.php";

$username = $_POST['username'];
$firstname = $_POST['firstname'];
$name = $_POST['name'];
$mail = $_POST['mail'];
$phone = $_POST['phone'];
$street = $_POST['street'];
$streetNumber = $_POST['streetNumber'];
$zip = $_POST['zip'];
$city = $_POST['city'];

DatabaseUtil::executeQuery("UPDATE `user` SET firstname='$firstname', name='$name', mail='$mail', phone='$phone'
		WHERE username='$username'");

$res = DatabaseUtil::executeQuery("SELECT * FROM `has_address` WHERE username='$username'");
if(mysql_num_rows($res)==0){
	DatabaseUtil::executeQuery("INSERT INTO `address` (street, street_number, city, zip) VALUES ('$street', '$streetNumber', '$city', '$zip')");
	DatabaseUtil::executeQuery("INSERT INTO `has_address` (username, aid) VALUES ('$username', '".DatabaseUtil::getLastInsertedAddressID()."')");
}else{
	DatabaseUtil::executeQuery("UPDATE `address` SET street='$street', street_number='$streetNumber', zip='$zip', city='$city'
								WHERE aid = (SELECT aid FROM `has_address` 
												WHERE username='$username')");
}


?>