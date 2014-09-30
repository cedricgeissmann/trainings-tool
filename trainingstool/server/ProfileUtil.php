<?php

include_once "AdminUtil.php";
include_once "DatabaseUtil.php";
include_once "MailUtil.php";
include_once "LoggerUtil.php";

$logger = new LoggerUtil();


/**
 * A utility class that hold functions to make changes to a users profile.
 */
class ProfileUtil{

	/**
	 * Creates a new user in the database. If the username allready is taken, update the user date to the newly insertet. If the firstname and name are allready in use, deny access, because the user allready exists.
	 * @param String $username the username of the newly created user.
	 * @param String $firstname the firstname of the user.
	 * @param Stirng $name the lastname of the user.
	 * @param String $password the md5 encoded password.
	 * @param Data $birthdate the users birthdate in format yyyy-mm-dd.
	 * @param String $mail the email address of the user.
	 * @param String phone the users phonenumber in the format +41 xx xxx xx xx
	 */
	public static function createNewUser($username, $firstname, $name, $password, $birthdate, $mail, $phone){
		$res = DatabaseUtil::executeQuery("SELECT username FROM `user` WHERE username='$username'");
		if(mysql_num_rows($res)>0){
			DatabaseUtil::executeQuery("UPDATE `user` SET firstname='$firstname', name='$name', birthdate='$birthdate', mail='$mail', phone='$phone' WHERE username='$username'");
			echo "Der Benutzer $firstname $name wurde erfolgreich angepasst.";
			return;
		}
		$res = DatabaseUtil::executeQuery("SELECT username FROM `user` WHERE firstname='$firstname' AND name='$name'");
		if(mysql_num_rows($res)>0){
			echo "Sie sind bereits mit einem anderen Benutzernamen angemeldet.";
			return;
		}
		DatabaseUtil::executeQuery("INSERT INTO `user`(username, firstname, name, password, birthdate, mail, phone) VALUES ('$username', '$firstname', '$name', '$password', '$birthdate', '$mail', '$phone')");
		echo "Ein neuer Benutzer wurde erstellt. Bitte warten Sie bis Sie vom Administrator freigeschatlen werden.";
	}
	
	/**
	 * Adds a new address for a specific user. If the address allready exists, update the address.
	 * @param String $username the users username for who the address is inserted.
	 * @param String $street the name of the street the user lives in.
	 * @param Integer $streetNumber the number of the street user lives in.
	 * @param String $city the name of the city the user lives in.
	 * @param Integer $zip the zip code of the city the user lives in.
	 */
	public static function updateAddressForUser($username, $street, $streetNumber, $city, $zip){
		$res = DatabaseUtil::executeQuery("SELECT * FROM `address` WHERE username='$username'");
		if(mysql_num_rows($res)==0){
			DatabaseUtil::executeQuery("INSERT INTO `address` (username, street, street_number, city, zip) VALUES ('$username', '$street', '$streetNumber', '$city', '$zip')");
		}else{
			DatabaseUtil::executeQuery("UPDATE `address` SET street='$street', street_number='$streetNumber', zip='$zip', city='$city'
			WHERE username='$username'");
		}
	}
	
	/**
	 * Sets a new password for the specified user only if the old password is correct.
	 * @param String $username the username for who the password is reset.
	 * @param String $oldPassword the former password in md5 encoded.
	 * @param String $newPassword the new password in md5 encoded.
	 */
	public static function updatePassword($username, $oldPassword, $newPassword){
		DatabaseUtil::executeQuery("UPDATE `user` SET password='$newPassword' WHERE username='$username' AND password='$oldPassword'");
	}
	
	/**
	 * Sets the default subscription for a specific user to 1 or 0.
	 * @param String $username the username of the user for who the default subscription will be set.
	 * @param tinyint $subscribeType 1 if the user will be subscribed or 0 if the user is unsubscribed for this training.
	 * @param Integer $trainingsID the id of the default training from which the request is sent.
	 */
	public static function defaultSubscribe($username, $subscribeType, $trainingsID){
		$res = DatabaseUtil::executeQuery("SELECT * FROM `user_defaults` WHERE username='$username' AND trainingsID='$trainingsID'");
		if(mysql_num_rows($res)>0){
			DatabaseUtil::executeQuery("UPDATE `user_defaults` SET subscribe_type='$subscribeType' WHERE username='$username' AND trainingsID='$trainingsID'");
		}else{
			DatabaseUtil::executeQuery("INSERT INTO `user_defaults` (username, trainingsID, subscribe_type) VALUES ('$username', '$trainingsID', '$subscribeType')");
		}
	}
	
	/**
	 * Gets a json object with all team members of a specific user, and the privileges of the selected user.
	 * @param String $username the username of the user for who the profile is loaded for.
	 * @returns JSON-Object that contains the profile data for a user, a list of all team members, the selected user, and admin privileges.
	 */
	public static function getUserProfile($username){
		$res = DatabaseUtil::executeQueryAsJSON("SELECT DISTINCT * FROM `user` INNER JOIN (address) ON address.username = user.username WHERE user.username = '$username'");
		$json = json_decode($res);
		//if a person does not have any address data.
		if(count($json)<1){
			$res = DatabaseUtil::executeQueryAsJSON("SELECT * FROM `user` WHERE username='$username'");
		}
		$admin = AdminUtil::getAdmin($_SESSION["user"]["username"]);
		$teamList = DatabaseUtil::executeQueryAsJSON("SELECT * FROM `role` WHERE username='$username'");
		$teamMembers = self::getTeamMembersByUser($username);
		return "{\"selectedUser\": \"$username\", \"adminData\": $admin, \"profileData\": $res, \"teamList\":$teamList , \"teamMembers\": $teamMembers}";
	}
	
	/**
	 * Get a list of all users who are in the team specified with the specified user.
	 * @param String $username the name of the user whos members are accessed.
	 * @returns JSON-Array of all users that share a team with the user.
	 */
	public static function getTeamMembersByUser($username){
		$res = DatabaseUtil::executeQueryAsJSON("SELECT DISTINCT user.username AS username, user.firstname AS firstname, user.name AS name FROM `role` INNER JOIN (user, teams) ON (user.username=role.username AND role.tid=teams.id) WHERE teams.id IN (SELECT role.tid FROM role WHERE username='$username')");
		return $res;
	}
	
	/**
	 * Get a list of all users who are in the team specified with the teamID.
	 * @param Integer $teamID the id of the team whos members are accessed.
	 * @returns JSON-Array of all users in the team.
	 */
	public static function getTeamMembers($teamID){
		$res = DatabaseUtil::executeQueryAsJSON("SELECT user.username, firstname, name FROM `role` INNER JOIN `user` ON (user.username=role.username) WHERE tid='$teamID'");
		return $res;
	}
	
	/**
	 * Gets a list of all teams.
	 * @returns JSON-Array that holds all teams.
	 */
	public static function getTeamList(){
		return DatabaseUtil::executeQueryAsJSON("SELECT * FROM teams");
	}
	
	/**
	 * Gets a list of all teams the session user is admin or trainer.
	 * @returns JSON-Array of all teams in which the user is admin or trainer.
	 */
	public static function getTeamListForAdmin(){
		$username = $_SESSION["user"]["username"];
		return DatabaseUtil::executeQueryAsJSON("SELECT DISTINCT * FROM teams INNER JOIN (role) ON teams.id=role.tid WHERE username='$username' AND (trainer='1' OR admin='1')");
	}
	
	
	/**
	 * Creates the default roles for a user in a team list.
	 * @param String $username the username for who the default role will be set.
	 * @param Array $teamList an array that contains all the teams for which the default role will be set.
	 */
	public static function createDefaultRoles($username, $teamList){
		$implodedTeamList = implode(',', $teamList);
		foreach($teamList as $teamID){
			$res = DatabaseUtil::executeQuery("SELECT * FROM `role` WHERE username='$username' AND tid='$teamID'");
			if(mysql_num_rows($res)==0){
				DatabaseUtil::executeQuery("INSERT INTO `role` (username, tid) VALUES ('$username', '$teamID')");
				$resAdmins = DatabaseUtil::executeQuery("SELECT username FROM `role` WHERE admin='1' AND tid='$teamID'");
				if($rowAdmins = mysql_fetch_assoc($resAdmins)){		//TODO replace with while to notify all admins.
					MailUtil::adminNotificationNewUser($username, $rowAdmins['username']);
				}
			}
		}
		DatabaseUtil::executeQuery("DELETE FROM `role` WHERE tid NOT IN ($implodedTeamList) AND username='$username'");
	}
	
	
	/**
	 * Takes a date string an converts it to the format yyyy-mm-dd
	 * @param String $inputDate a string that represents a date.
	 * @returns String the date in the format yyyy-mm-dd
	 */
	public static function convertDate($inputDate){
		$time = strtotime($inputDate);
		$outputDate = date('Y-m-d',$time);
		return $outputDate;
	}
}

$function = $_POST["function"];
switch($function){
	case "updateUser":
		$username = "";
		if(isset($_POST["userSelection"])){
			$username = $_POST["userSelection"];
		}else if(isset($_POST["usernameField"])){
			$username = $_POST["usernameField"];
		}
		$date = ProfileUtil::convertDate($_POST["dateField"]);
		ProfileUtil::createNewUser($username, $_POST["firstnameField"], $_POST["nameField"], md5($_POST["newPasswordField"]), $date, $_POST["mailField"], $_POST["phoneField"]);
		ProfileUtil::updateAddressForUser($username, $_POST["streetnameField"], $_POST["streetNumberField"], $_POST["cityField"], $_POST["zipField"]);
		ProfileUtil::createDefaultRoles($username, $_POST["teamSelector"]);
		$logger->writeLog($_SESSION["user"]["username"], $function);
		break;
	case "defaultSubscribe":
		echo $_SESSION["user"]["username"];
		ProfileUtil::defaultSubscribe($_SESSION["user"]["username"], $_POST["subscribeType"], $_POST["trainingsID"]);
		$logger->writeLog($_SESSION["user"]["username"], $function);
		break;
	case "defaultSubscribeForTrainingFromAdmin":
		ProfileUtil::defaultSubscribe($_POST["username"], $_POST["subscribeType"], $_POST["trainingsID"]);
		$logger->writeLog($_SESSION["user"]["username"], $function);
		break;
	case "getSession":
		echo $_SESSION[$_POST["sessionDescriber"]][$_POST["variableName"]];
		$logger->writeLog($_SESSION["user"]["username"], $function);
		break;
	case "getUserProfile":
		$username = $_SESSION["user"]["username"];
		if(isset($_POST["username"]) && $_POST["username"]!=""){
			$username = $_POST["username"];
		}
		echo ProfileUtil::getUserProfile($username);
		$logger->writeLog($_SESSION["user"]["username"], $function);
		break;
	case "getTeamMembers":
		echo ProfileUtil::getTeamMembers($_POST["teamID"]);
		$logger->writeLog($_SESSION["user"]["username"], $function);
		break;
	case "getTeamList":
		echo ProfileUtil::getTeamList();
		$logger->writeLog($_SESSION["user"]["username"], $function);
		break;
	case "getTeamListForAdmin":
		echo ProfileUtil::getTeamListForAdmin();
		$logger->writeLog($_SESSION["user"]["username"], $function);
		break;
	default:
		var_dump($_POST);
}

?>