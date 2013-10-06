<?php

include_once 'DatabaseUtil.php';

class ChatUtil{
	
	public static function messageSent($sender, $receiver, $message){
		DatabaseUtil::executeQuery("INSERT INTO chat (sender, receiver, message) VALUES ('$sender', '$receiver', '$message')");
	}
	
	/**
	 * Gives all messages for one receiver.
	 * @param unknown $receiver is the receiver of the messages.
	 * @return returns the query result as json string.
	 */
	public static function getMessages($receiver){
		return DatabaseUtil::executeQueryAsJson("SELECT * FROM chat WHERE receiver='$receiver' ORDER BY sendtime DESC");
	}
	
	/**
	 * Gives all messages for one receiver.
	 * @param unknown $receiver is the receiver of the messages.
	 * @param unknown $sender is the sender of the messages.
	 * @return returns the query result as json string.
	 */
	public static function getMessagesFromSender($sender, $receiver){
		return DatabaseUtil::executeQueryAsJson("SELECT * FROM chat WHERE receiver IN ('$receiver', '$sender') AND sender IN ('$sender', '$receiver') ORDER BY sendtime DESC");
	}

	public static function getTeamMembers($username){
		$resultString = "";
		$res = DatabaseUtil::executeQuery("SELECT DISTINCT user.username, firstname, name FROM user LEFT JOIN team_member ON (user.username = team_member.username) WHERE tid IN (SELECT tid FROM team_member WHERE username = '$username') AND activate='1'");
		while($row = mysql_fetch_assoc($res)){
			$resultString .= "<li><a href='#' class='teamMember' onclick=\"loadMessages('$row[username]')\">$row[firstname] $row[name]</a></li>";
		}
		return $resultString;
	}
	
}

/**
 * Evaluate incoming requests.
 */
$function = $_POST["function"];
switch($function){
	case "messageSent":
		ChatUtil::messageSent($_POST["sender"], $_POST["receiver"], $_POST["message"]);
		break;
	case "getMessages":
		echo ChatUtil::getMessages($_POST["receiver"]);
		break;
	case "getMessagesFromSender":
		echo ChatUtil::getMessagesFromSender($_POST["sender"], $_POST["receiver"]);
		break;
}
?>