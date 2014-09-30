<?php

include_once 'DatabaseUtil.php';
include_once "LoggerUtil.php";

$logger = new LoggerUtil();		//writes into the log which user has called which function.

/**
 * This utility class contains function that are used to control the chat functionallity.
 */
class ChatUtil{
	
	/**
	 * A message has been sent. Writes it into the database.
	 * @param String $sender the username of the message sender.
	 * @param String $reciever the username of the message receiver.
	 * @param String $message the message that is sent from the sender to the receiver.
	 */
	public static function messageSent($sender, $receiver, $message){
		DatabaseUtil::executeQuery("INSERT INTO chat (sender, receiver, message) VALUES ('$sender', '$receiver', '$message')");
	}
	
	/**
	 * Gives all messages for one receiver.
	 * @param String $receiver is the receiver of the messages.
	 * @return returns the query result as json string.
	 */
	public static function getMessages($receiver){
		return DatabaseUtil::executeQueryAsJson("SELECT * FROM chat WHERE receiver='$receiver' ORDER BY sendtime DESC");
	}
	
	/**
	 * Gives all messages for one receiver.
	 * @param String $receiver is the receiver of the messages.
	 * @param String $sender is the sender of the messages.
	 * @return returns the query result as json string.
	 */
	public static function getMessagesFromSender($sender, $receiver, $lastId){
		$res = DatabaseUtil::executeQueryAsJson("SELECT s.firstname AS senderFirstname, s.name AS senderName, s.username AS sender, message, sendtime, r.firstname AS receiverFirstname, r.name AS receiverName FROM chat INNER JOIN user s ON (chat.sender=s.username) INNER JOIN user r ON (chat.receiver=r.username) WHERE receiver IN ('$receiver', '$sender') AND sender IN ('$sender', '$receiver') AND id>'$lastId' ORDER BY sendtime ASC");
		$resId = DatabaseUtil::executeQueryAsJson("SELECT MAX(id) AS lastId FROM chat INNER JOIN user s ON (chat.sender=s.username) INNER JOIN user r ON (chat.receiver=r.username) WHERE receiver IN ('$receiver', '$sender') AND sender IN ('$sender', '$receiver')");
		$username = $_SESSION["user"]["username"];
		DatabaseUtil::executeQuery("UPDATE `chat` SET `read`='1' WHERE receiver='$username' AND sender='$receiver'");
		return "{\"id\": $resId, \"data\": $res}";
	}

	/**
	 * Get the contact list for the logged in user. The contact list contains all users who share a team with the logged in user.
	 * @returns a JSON array with username firstname and name.
	 */
	public static function getContactList(){
		$username = $_SESSION["user"]["username"];
		$res = DatabaseUtil::executeQueryAsJSON("SELECT DISTINCT user.username, firstname, name FROM user LEFT JOIN role ON (user.username = role.username) WHERE tid IN (SELECT tid FROM role WHERE username = '$username') AND activate='1' AND user.username NOT IN ('$username') ORDER BY firstname ASC, name ASC");
		return $res;
	}
	
	/**
	 * Get the number of unread messages with a specific conversation partner.
	 * @returns a JSON array that contains the number of unread messages.
	 */
	public static function getNumberOfUnread($conversationPartner){
	    $username = $_SESSION["user"]["username"];
	    $res = DatabaseUtil::executeQueryAsJSON("SELECT (SELECT COUNT(id) FROM `chat` WHERE (sender='$conversationPartner' AND receiver='$username') OR (sender='$username' AND receiver='$conversationPartner')) AS tot, (SELECT COUNT(id) FROM `chat` WHERE receiver='$username' AND sender='$conversationPartner' AND `read`='0') AS unread");
	    return $res;
	}
	
	/**
	 * Get the sum of all messages for the current logged in user which have the unread flag.
	 * @returns a JSON array that contains the number of total unread messages for this user.
	 */
	public static function getNewMessageCount(){
		$username = $_SESSION["user"]["username"];
		$res = DatabaseUtil::executeQueryAsJSON("SELECT COUNT(*) AS count FROM chat WHERE receiver='cedy' AND `read`='0'");
		return $res;
	}
	
}

/**
 * Evaluate incoming requests.
 */
$function = $_POST["function"];
switch($function){
	case "messageSent":
		ChatUtil::messageSent($_POST["sender"], $_POST["receiver"], $_POST["message"]);
		$logger->writeLog($_SESSION["user"]["username"], $function);
		break;
	case "getMessages":
		echo ChatUtil::getMessages($_POST["receiver"]);
		$logger->writeLog($_SESSION["user"]["username"], $function);
		break;
	case "getMessagesFromSender":
		echo ChatUtil::getMessagesFromSender($_POST["sender"], $_POST["receiver"]);
		$logger->writeLog($_SESSION["user"]["username"], $function);
		break;
	case "getContactList":
		echo ChatUtil::getContactList();
		$logger->writeLog($_SESSION["user"]["username"], $function);
		break;
	case "loadConversations":
		$ownUsername = $_SESSION["user"]["username"];
		$username = $_POST["username"];
		$lastId = $_POST["lastId"];
		echo ChatUtil::getMessagesFromSender($ownUsername, $username, $lastId);
		//$logger->writeLog($_SESSION["user"]["username"], $function);
		break;
	case "getNumberOfUnread":
	    echo ChatUtil::getNumberOfUnread($_POST["conversationPartner"]);
	    break;
	case "getNewMessageCount":
	    echo ChatUtil::getNewMessageCount();
	    break;
}
?>