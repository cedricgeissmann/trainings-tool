<?php

include_once 'DatabaseUtil.php';

class ChatUtil{
	
	public static function messageSent($sender, $receiver, $message){
		DatabaseUtil::executeQuery("INSERT INTO chat (sender, receiver, message) VALUES ('$sender', '$receiver', '$message')");
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
}
?>