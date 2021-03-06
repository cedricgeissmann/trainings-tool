<?php

/**
 * @router_may_call
 * This utility class holds multiple functions to execute admin functions on the server side.
 */
class AdminUtil{
	
	public function __construct(){
		$this->db = new DBConnection();
	}


	/**
	 * Get the id of a default training if the training relies on a default training.
	 * @param int $trainingsID the id of the training for which the default training id is searched.
	 * @returns the id of the training or -1 if none is found.
	 */
	private static function getDefaultTrainingIDForTraining($trainingsID){
		$res = DatabaseUtil::executeQuery("SELECT trainingsID FROM training WHERE id='$trainingsID'");
		while($row = mysql_fetch_assoc($res)){
			return $row["trainingsID"];
		}
		return -1;
	}
	
	
	/**
	 *
	 *
	 * ADOPTED
	 *
	 *
	 *
	 *
	 * Checks if the current logged in user has admin rights or not.
	 * @returns boolean true if the user is admin, false if not.
	 */
	public function checkIfUserIsAdmin(){
		$username = $_SESSION["user"]["username"];
		if( $this->db->exists("SELECT * FROM role WHERE username = '$username' AND admin = 1") ){
			return TRUE;
		}else{
			return FALSE;
		}
	}
	
	/**
	 *
	 *
	 * ADOPTED
	 *
	 *
	 *
	 *
	 *
	 * This function checks if the user is admin. If so the script continues execution. If not the script will abort.
	 */
	 public function mayExecuteIfAdmin(){
	 	if(!$this->checkIfUserIsAdmin()){
	 		die("User is not an admin. Script cannot be executed any further.");
	 	}
	 }
	
	/**
	 *
	 * ADOPTED
	 *
	 *
	 *
	 * INFO: Needs admin privileges.
	 * Adds an entry in the database, if a user will be subscribed or not for a specific training. If the entry allready exists, update the entry in the database.
	 * @param String $username the username for the user who will be subscribed.
	 * @param int $subscribeType 1 if the user should be subscribed or 0 if the user should be unsubscribed.
	 * @param int $trainingsID the id of the training the user will be subscribed for.
	 *
	 * @router_may_call
	 */
	public function subscribeForTrainingFromAdmin($args){
		$this->mayExecuteIfAdmin();

		$username = $args["username"];
		$subscribeType = $args["subscribeType"];
		$trainingsID = $args["trainingsID"];

		$allreadySubscribed = $this->db->exists("SELECT * FROM subscribed_for_training WHERE username = '$username' AND trainingsID = '$trainingsID'");
		if($allreadySubscribed){
			$this->db->update("UPDATE subscribed_for_training SET subscribe_type = '$subscribeType' WHERE trainingsID='$trainingsID' AND username='$username'");
		}else{
			$this->db->insert("INSERT INTO subscribed_for_training (username, subscribe_type, trainingsID) VALUES ('$username', '$subscribeType', '$trainingsID')");
		}
	}
	
	/**
	 *
	 * ADOPTED
	 *
	 *
	 * INFO: Needs admin privileges.
	 * Remove a subscription entry for a specific user from a specific training.
	 * @param String $username the username of the user who will be removed.
	 * @param int $trainingsID the id of the training from which the user will be removed.
	 *
	 * @router_may_call
	 */
	public function removeFromTrainingFromAdmin($args){
		$this->mayExecuteIfAdmin();

		$username = $args["username"];
		$trainingsID = $args["trainingsID"];

		$this->db->delete("DELETE FROM `subscribed_for_training` WHERE username = '$username' AND trainingsID = '$trainingsID'");
	}
	
	/**
	 * INFO: Needs admin privileges.
	 * Sets the status of an user eigther to active or inactive. This determines if the user may log in or not.
	 * @param String $username the username of the user who will be activated.
	 * @param int $active 1 if the user should be activated, or 0 if the user should be deactivated.
	 *
	 * router_may_call
	 */
	public static function activate($username, $active){
		$this->mayExecuteIfAdmin();

		$username = $args["username"];
		$active = $args["active"];

		$this->db->update("UPDATE `user` SET activate='$active' WHERE username='$username'");
	}
	
	/**
	 * INFO: Needs admin privileges.
	 * Change the trainer role of a user for a specific team.
	 * @param String $username the name of the user who will change trainer access.
	 * @param int $active 1 if the user will be granted to be trainer, or 0 if it will be denied.
	 * @param int $teamID id of the team a user will be trainer or not.
	 */
	public static function changeTrainer($username, $active, $teamID){
		self::mayExecuteIfAdmin();
		DatabaseUtil::executeQuery("UPDATE `user` INNER JOIN role ON (user.username=role.username) SET role.trainer='$active' WHERE user.username='$username' AND role.tid='$teamID'");		// AND role.tid IN (SELECT tid FROM role WHERE role.username='$admin')
	}
	
	/**
	 * INFO: Needs admin privileges.
	 * Change the admin role of a user for a specific team.
	 * @param String $username the name of the user who will change admin access.
	 * @param int $active 1 if the user will be granted to be admin, or 0 if it will be denied.
	 * @param int $teamID id of the team a user will be admin or not.
	 */
	public static function changeAdmin($username, $active, $teamID){
		seld::mayExecuteIfAdmin();
		DatabaseUtil::executeQuery("UPDATE `user` INNER JOIN role ON (user.username=role.username) SET role.admin='$active' WHERE user.username='$username' AND role.tid='$teamID'");			// AND role.tid IN (SELECT tid FROM role WHERE role.username='$admin')
	}
	
	/**
	 * INFO: Needs admin privileges.
	 * Marks a specific user in the database as deleted. Deletet users should be ignored in all queries.
	 * @param String $username the name of the user who will be marked as deleted.
	 */
	public static function deleteUser($username){
		self::mayExecuteIfAdmin();
		DatabaseUtil::executeQuery("UPDATE `user` SET deleted='1' WHERE username='$username'");
	}
	
	/**
	 * Resets the password for a user. This can eigther be called if the user resets his own password, of if a user has admin privileges.
	 * @param String $username the name of the user whos passowrd will be reset.
	 * @param String $oldPassword the md5 encrypted value for the old password.
	 * @param String $newPassword the md5 encrypted value for the new password.
	 */
	public static function resetPassword($username, $oldPassword, $newPassword){
		if($_SESSION["user"]["admin"]=="1"){
			self::mayExecuteIfAdmin();
			DatabaseUtil::executeQuery("UPDATE user SET password='$newPassword' WHERE username='$username'");
			echo "Passwort wurde erfolgreich durch den Administrator zurückgesetzt.";
		}else if($_SESSION["user"]["username"]==$username){
			$res = DatabaseUtil::executeQuery("UPDATE user SET password='$newPassword' WHERE username='$username' AND password='$oldPassword'");
			echo "Passwort wurde erfolgreich zurückgesetzt.";
		}
	}
	
	/**
	 * Returns a json-array for a specific user, containing username, firstname and name.
	 * @param string $username this spesific user.
	 * @return json a json array with username, firstname and name.
	 */
	public static function getUser($username){
		$res = DatabaseUtil::executeQueryAsJSON("SELECT username, firstname, name FROM `user` WHERE username='$username'");
		return "{\"user\": $res}";
	}
	
	/**
	 * INFO: Needs admin privileges.
	 * Set de default subsciption for a specific user. This only works for standart trainings. Dont create a database entry if there is no default training id.
	 * @param String $username the name of the user who will be subscribed for a default training.
	 * @param int $subscribeType 1 if the user will be subscribed for this default training or 0 if the user will be unsubscribed.
	 * @param int $trainingsID the id of the training from which the request is sent.
	 */
	public static function defaultSubscribeFromAdmin($username, $subscribeType, $trainingsID){
		$trainingsID = self::getDefaultTrainingIDForTraining();
		$res = DatabaseUtil::executeQuery("SELECT * FROM `user_defaults` WHERE username='$username' AND trainingsID='$trainingsID'");
		if(mysql_num_rows($res)>0){
			DatabaseUtil::executeQuery("UPDATE `user_defaults` SET subscribe_type='$subscribeType' WHERE username='$username' AND trainingsID='$trainingsID'");
		}else{
			DatabaseUtil::executeQuery("INSERT INTO `user_defaults` (username, trainingsID, subscribe_type) VALUES ('$username', '$trainingsID', '$subscribeType')");
		}
	}
	
	/**
	 * Returns a JSON array that contains the admin privileges for a user, for all teams.
	 * @param String $username the name of the user for who the admin lookup is for.
	 * @returns a JSON array with the admin privileges.
	 */
	public static function getAdmin($username){
		$res = DatabaseUtil::executeQueryAsJSON("SELECT admin, tid FROM `role` WHERE username = '$username'");
		return $res;
	}
	
	/**
	 * Get all user from a specific team.
	 * @param int $teamID the id of the team, which members are accessed.
	 * @returns JSON array that contains all the users of the specified team.
	 */
	private static function getTeamMembers($teamID){
		return DatabaseUtil::executeQueryAsJSON("SELECT DISTINCT * FROM `role` INNER JOIN (`user`, `address`) ON (role.username=user.username AND role.username=address.username) WHERE tid='$teamID' AND user.deleted='0'");
	}
	
	/**
	 * Loads all teams with members where the user is admin.
	 */
	public static function initAdmin(){
		if($_SESSION["user"]["admin"]==1){
			$username = $_SESSION["user"]["username"];
			$res = DatabaseUtil::executeQuery("SELECT name AS teamname, tid, admin FROM `role` INNER JOIN (teams) ON teams.id=role.tid WHERE username='$username'");
			$adminData = "[";
			$first = true;
			while($row = mysql_fetch_assoc($res)){
				if(AdminUtil::isSuperuser() || $row["admin"]==1){
					if(!$first){
						$adminData .= ",";
					}else{
						$first = false;
					}
					$teamID = $row["tid"];
					$teamName = $row["teamname"];
					$adminData .= "{";
					$adminData .= "\"teamID\": \"$teamID\",";
					$adminData .= "\"teamName\": \"$teamName\",";
					$adminData .= "\"teamMembers\": ". self::getTeamMembers($teamID)."";
					$adminData .= "}";
				}
			}
			$adminData .= "]";
			return $adminData;
		}
		return "";
	}
	
	/**
	 * Checks if the currently logged in user has superuser privileges.
	 * @returns boolean true if the user is superuser in a team. False if there is no superuser flag.
	 */
	public static function isSuperuser(){
		$username = $_SESSION["user"]["username"];
		$res = DatabaseUtil::executeQuery("SELECT superuser FROM `role` WHERE username='$username'");
		while($row = mysql_fetch_assoc($res)){
			if($row["superuser"]==1){
				return true;
			}
		}
		return false;
	}
	
	
	/**
	 * Checks if the currently logged in user has admin privileges.
	 * @returns boolean true if the user is admin in a team. False if there is no admin flag.
	 */
	public static function checkAdmin(){
		$username = $_SESSION["user"]["username"];
		$res = DatabaseUtil::executeQuery("SELECT admin FROM `role` WHERE username='$username'");
		while($row = mysql_fetch_assoc($res)){
			if($row["admin"]==1){
				return 1;
			}
		}
		return 0;
	}
	
	
	/**
	 * Checks if the currently logged in user has trainer privileges.
	 * @returns boolean true if the user is trainer in a team. False if there is no trainer flag.
	 */
	public static function checkTrainer(){
		$username = $_SESSION["user"]["username"];
		$res = DatabaseUtil::executeQuery("SELECT trainer FROM `role` WHERE username='$username'");
		while($row = mysql_fetch_assoc($res)){
			if($row["trainer"]==1){
				return 1;
			}
		}
		return 0;
	}
	
	/**
	 * Get the username of the currently logged in user.
	 * @returns String the username of the logged in user.
	 */
	public static function getSessionUser(){
		return $_SESSION["user"]["username"];
	}
	
	/**
	 * Get the name and firstname corresponding to a specific username.
	 * @returns String firstname name or an empty string if no username is found.
	 */
	public static function getFullName($username){
		$res = DatabaseUtil::executeQuery("SELECT name, firstname FROM `user` WHERE username='$username'");
		if(mysql_num_rows($res)>0){
			$row = mysql_fetch_assoc($res);
			return $row["firstname"]." ".$row["name"];
		}
		return "";		//no name found
	}
	
	/**
	 * Gets a JSON array that contain admin and trainer privileges for each team.
	 * @returns JSON array with admin and trainer privileges.
	 */
	public static function checkAdminAndTrainer($username){
		return DatabaseUtil::executeQueryAsJSON("SELECT admin, trainer FROM role WHERE username='$username'");
	}
	
	/**
	 * Checks if the user is admin in any of the teams he is a member of.
	 * @param String $username the username of the user for who the admin property is evaluated for.
	 * @returns True if the user is admin, False if the user is not admin in any team.
	 */
	public static function isAdmin($username){
		$res = DatabaseUtil::executeQueryAsArrayAssoc("SELECT COUNT(admin) AS admin FROM `role` WHERE admin=1 AND username='$username'");
		if($res[0]['admin']>0){
			return true;
		}
		return false;
	}

	public static function createNewTeam($teamname){
		self::mayExecuteIfAdmin();
		$count = DatabaseUtil::executeQueryAsArrayAssoc("SELECT COUNT(name) AS count FROM `teams` WHERE name = '$teamname'");
		var_dump($count);
		if($count[0]['count'] > 0){
			echo "A team with this name already exists.";
		}else{
			DatabaseUtil::executeQuery("INSERT INTO `teams` (name, need_reason) VALUES ('$teamname', 0)");
		}
	}


	public static function getOrganizerData(){
		$username = $_SESSION["user"]["username"];
		$res = DatabaseUtil::executeQueryAsJSON("SELECT teams.name AS teamname, teams.id AS teamid FROM teams INNER JOIN (`role`) ON (role.tid = teams.id) WHERE username='$username'");
		$teams = "{\"data\" : [{\"teams\": " . $res . "}]}";
		echo $teams;
	}
	
}
?>
