<?php

include_once "DatabaseUtil.php";


/**
 * This is a utility class that holds several functions, which are used to send mails.
 */
class MailUtil{
	
	/**
	 * Gets the email address of a user which is storred in the database.
	 * @param String $username the username for which user the email address is searched for.
	 * @returns String the email address in the form firstname name <mail>
	 */
	private static function getMailFromUsername($username){
		$res = DatabaseUtil::executeQuery("SELECT firstname, name, mail FROM `user` WHERE username='$username'");
		while($row = mysql_fetch_assoc($res)){
			$sender = "$row[firstname] $row[name] <$row[mail]>";
			//echo $sender;
			return $sender;
		}
		echo "Konnte keinen Benutzer mit diesem Kürzel finden.";
	}
	
	/**
	 * Notifies the administrator that a new user has subscribed to your application.
	 * @param String $sender the username of the new user.
	 * @param String $admin the administrator who is responsible for the team, the new user just signed in.	(Is not used at the moment.)
	 */
	public static function adminNotificationNewUser($sender, $admin){
		$admin = "cedy";			//Hardcoded. Select here the corresponding team admin.
		$subject = "Neue Anmeldung";
		$message = "Neuer Benutzer $sender hat sich angemeldet. Klicken Sie <a href='http://tvmuttenz.square7.ch/admin.php'>hier</a> um den Benutzer freizuschalten.<br><br>TVMuttenz Volleyball Online Tool";
		MailUtil::sendMail($admin, $subject, $message, $sender);
	}
	
	/**
	 * Sends a mail from the sender to the receiver with specified subject and message body.
	 * @param String $receiverUsername the username to who the mail is send to.
	 * @param String $subject the subject of the mail.
	 * @param String $message the message which will be sent.
	 * @param String $senderUsername the username of the sender.
	 */
	public static function sendMail($receiverUsername, $subject, $message, $senderUsername){
		$receiverMail = MailUtil::getMailFromUsername($receiverUsername);
		$senderMail = MailUtil::getMailFromUsername($senderUsername);
    	
    	$header  = "MIME-Version: 1.0\r\n";
		$header .= "Content-type: text/html; charset=iso-8859-1\r\n";
		$header .= "From: $senderMail\r\n";
		$header .= "Reply-To: $senderMail\r\n";
		$header .= "X-Mailer: PHP ". phpversion();

		mail($receiverMail, $subject, $message, $header);
		//echo "Mail sent.";
	}
	
	/**
	 * TODO: Delete, beacause its just a test mail.
	 * Sends a testmail with fixed subject and message from the sender to the receiver.
	 * @param String $receiverMail the mailaddress of the receiver.
	 * @param String $senderMail the email address from where the message is sent.
	 */
	public static function testMail($receiverMail, $senderMail){
		$header  = "MIME-Version: 1.0\r\n";
		$header .= "Content-type: text/html; charset=iso-8859-1\r\n";
		$header .= "From: $senderMail\r\n";
		$header .= "Reply-To: $senderMail\r\n";
		$header .= "X-Mailer: PHP ". phpversion();
		mail($receiverMail, "Test", "Testmail", $header);
	}

}


$function = $_POST["function"];
switch($function){
	case "testMail":
		MailUtil::testMail($_POST["receiver"], $_POST["sender"]);
		break;
}

?>