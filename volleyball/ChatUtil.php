<?php

include_once 'DatabaseUtil.php';

class ChatUtil{
	
	public static function messageSent($sender, $receiver, $message){
		DatabaseUtil::executeQuery("INSERT INTO chat (sender, receiver, message) VALUES ('$sender', '$receiver', '$message')");
	}
	
	public static function getMessages($receiver){
		echo DatabaseUtil::executeQueryAsJson("SELECT * FROM chat WHERE receiver='$receiver'");
	}

	
}

/**
 * Evaluate incoming requests.
 */
$function = $_POST["func"];
switch($function){
	case "messageSent":
		ChatUtil::messageSent($_POST["sender"], $_POST["receiver"], $_POST["message"]);
		break;
	case "getMessages":
		ChatUtil::getMessages($_POST["receiver"]);
		break;
}
?>