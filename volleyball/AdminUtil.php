<?php

include_once 'DatabaseUtil.php';

class AdminUtil{
	
	public static function sendMail($username, $subject, $message){
		$res = DatabaseUtil::executeQuery("SELECT mail FROM user WHERE username='$username'");
		$to = mysql_fetch_array($res);
		$from = "volleyball.tvmuttenz@gmail.com";
		$headers = "From:" . $from;
		mail($to[mail],$subject,$message,$headers);
	}
	
	public static function subscribeForTrainingFromAdmin($username, $subscribeType, $trainingsID){
// 		$username = DatabaseUtil::executeQuery("SELECT username FROM user WHERE firstname='$firstname' AND name='$lastname'");
// 		$username = mysql_fetch_array($username);
// 		$username = $username["username"];
		$allreadySubscribed = DatabaseUtil::executeQuery("SELECT * FROM subscribed_for_training WHERE username = '$username' AND trainingsID = '$trainingsID'");
		if(mysql_num_rows($allreadySubscribed)>0){
			DatabaseUtil::executeQuery("UPDATE subscribed_for_training SET subscribe_type = '$subscribeType' WHERE trainingsID='$trainingsID' AND username='$username'");
		}else{
			DatabaseUtil::executeQuery("INSERT INTO subscribed_for_training (username, subscribe_type, trainingsID) VALUES ('$username', '$subscribeType', '$trainingsID')");
		}
	}
	
	public static function removeFromTrainingFromAdmin($username, $trainingsID){
// 		$username = DatabaseUtil::executeQuery("SELECT username FROM user WHERE firstname='$firstname' AND name='$lastname'");
// 		$username = mysql_fetch_array($username);
// 		$username = $username["username"];
		DatabaseUtil::executeQuery("DELETE FROM `subscribed_for_training` WHERE username = '$username' AND trainingsID = '$trainingsID'");
	}
	
	public static function activate($username, $active){
		DatabaseUtil::executeQuery("UPDATE `user` SET activate='$active' WHERE username='$username'");
	}
	
	public static function changeTrainer($username, $active){
		DatabaseUtil::executeQuery("UPDATE `user` SET trainer='$active' WHERE username='$username'");
	}
	
	public static function changeAdmin($username, $active){
		DatabaseUtil::executeQuery("UPDATE `user` SET admin='$active' WHERE username='$username'");
	}
	
	public static function deleteUser($username){
		DatabaseUtil::executeQuery("DELETE FROM `user` WHERE username='$username'");
	}
	
	public static function resetPassword($username){
		
	}

	
}

/**
 * Evaluate incoming requests.
 */
$function = $_POST["function"];
switch($function){
	case "subscribeForTrainingFromAdmin":
		AdminUtil::subscribeForTrainingFromAdmin($_POST["username"], $_POST["subscribeType"], $_POST["trainingsID"]);
		break;
	case "removeFromTrainingFromAdmin":
		AdminUtil::removeFromTrainingFromAdmin($_POST["username"], $_POST["trainingsID"]);
		break;
	case "activate":
		AdminUtil::activate($_POST["username"], $_POST["active"]);
		break;
	case "changeTrainer":
		AdminUtil::changeTrainer($_POST["username"], $_POST["active"]);
		break;
	case "changeAdmin":
		AdminUtil::changeAdmin($_POST["username"], $_POST["active"]);
		break;
	case "deleteUser":
		AdminUtil::deleteUser($_POST["username"]);
		break;
	case "resetPassword":
		AdminUtil::resetPassword($_POST["username"]);
		break;
}
?>