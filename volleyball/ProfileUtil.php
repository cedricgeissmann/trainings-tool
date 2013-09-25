<?php

include "check_login.php";
include "DatabaseUtil.php";

class ProfileUtil{
	
	public static function updateUserTable($username, $firstname, $name, $mail, $phone){
		DatabaseUtil::executeQuery("UPDATE `user` SET firstname='$firstname', name='$name', mail='$mail', phone='$phone' WHERE username='$username'");
	}

	public static function createNewUser($username, $firstname, $name, $password, $mail, $phone){
		$res = DatabaseUtil::executeQuery("SELECT * FROM `user` WHERE username='$username'");
		if(mysql_num_rows($res)>0){
			echo "Benutzername wird bereits verwendet.";
			return;
		}
		$res = DatabaseUtil::executeQuery("SELECT * FROM `user` WHERE firstname='$firstname' AND name='$name'");
		if(mysql_num_rows($res)>0){
			echo "Sie sind bereits mit einem anderen Benutzernamen angemeldet.";
			return;
		}
		DatabaseUtil::executeQuery("INSERT INTO `user`(username, firstname, name, password, mail, phone) VALUES ('$username', '$firstname', '$name', '$password', '$mail', '$phone')");
	}
	
	public static function updateAddressForUser($username, $street, $streetNumber, $city, $zip){
		$res = DatabaseUtil::executeQuery("SELECT * FROM `has_address` WHERE username='$username'");
		if(mysql_num_rows($res)==0){
			DatabaseUtil::executeQuery("INSERT INTO `address` (street, street_number, city, zip) VALUES ('$street', '$streetNumber', '$city', '$zip')");
			DatabaseUtil::executeQuery("INSERT INTO `has_address` (username, aid) VALUES ('$username', '".DatabaseUtil::getLastInsertedAddressID()."')");
		}else{
			DatabaseUtil::executeQuery("UPDATE `address` SET street='$street', street_number='$streetNumber', zip='$zip', city='$city'
			WHERE aid = (SELECT aid FROM `has_address`
			WHERE username='$username')");
		}
	}
	
	public static function updatePassword($username, $oldPassword, $newPassword){
		DatabaseUtil::executeQuery("UPDATE `user` SET password='$newPassword' WHERE username='$username' AND password='$oldPassword'");
	}
	
	public static function getUserInformations($username){
		$res = DatabaseUtil::executeQuery("SELECT * FROM `user` WHERE username='$username'");
		return mysql_fetch_array($res);
	}
	
	public static function getAddressFromUser($username){
		$res = DatabaseUtil::executeQuery("SELECT * FROM `address` WHERE aid = (SELECT aid FROM `has_address` WHERE username='$username')");
		return mysql_fetch_array($res);
	}
	
	public static function defaultSubscribe($username, $subscribeType, $trainingsID){
		$res = DatabaseUtil::executeQuery("SELECT * FROM `user_defaults` WHERE username='$username' AND trainingsID='$trainingsID'");
		if(mysql_num_rows($res)>0){
			DatabaseUtil::executeQuery("UPDATE `user_defaults` SET subscribe_type='$subscribeType' WHERE username='$username' AND trainingsID='$trainiingsID'");
		}else{
			DatabaseUtil::executeQuery("INSERT INTO `user_defaults` (username, trainingsID, subscribe_type) VALUES ('$username', '$trainingsID', '$subscribeType')");
		}
	}
	
}

$function = $_POST["function"];
//echo $function;
switch($function){
	case "updateUser":
		ProfileUtil::updateUserTable($_POST["username"], $_POST["firstname"], $_POST["name"], $_POST["mail"], $_POST["phone"]);
		ProfileUtil::updateAddressForUser($_POST["username"], $_POST["street"], $_POST["streetNumber"], $_POST["city"], $_POST["zip"]);
		ProfileUtil::updatePassword($_POST["username"], md5($_POST["oldPassword"]), md5($_POST["newPassword"]));
		header ("Location: profile.php");
		break;
	case "createNewUser":
		ProfileUtil::createNewUser($_POST["username"], $_POST["firstname"], $_POST["name"], md5($_POST["password"]), $_POST["mail"], $_POST["phone"]);
		ProfileUtil::updateAddressForUser($_POST["username"], $_POST["street"], $_POST["streetNumber"], $_POST["city"], $_POST["zip"]);
		header ("Location: main.php");
		break;
	case "defaultSubscribe":
		ProfileUtil::defaultSubscribe($_SESSION["user"]["username"], $_POST["subscribeType"], $_POST["trainingsID"]);
		break;
	case "getSession":
		echo $_SESSION[$_POST["sessionDescriber"]][$_POST["variableName"]];
		break;
}

?>