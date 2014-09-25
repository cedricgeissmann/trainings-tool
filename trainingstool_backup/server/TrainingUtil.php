<?php
include_once 'DatabaseUtil.php';
include_once "LoggerUtil.php";

$logger = new LoggerUtil();

class TrainingUtil {
	public static $types = array (
			'training' => 'Trainings',
			'game' => 'Spiele',
			'beach' => 'Beach',
			'tournament' => 'Tourniere' 
	);
	
	public static $dayTranslate = array (
			'Monday' => 'Montag',
			'Tuesday' => 'Dienstag',
			'Wedensday' => 'Mittwoch',
			'Thursday' => 'Donnerstag',
			'Friday' => 'Freitag',
			'Saturday' => 'Samstag',
			'Sunday' => 'Sonntag'
	);
	
	
	private static function selectTrainings($username){
		return DatabaseUtil::executeQuery ( "SELECT training.id AS id, training.date AS date, training.day AS day, training.time_start AS time_start, training.time_end AS time_end, training.teamID AS teamID, role.admin AS admin, role.trainer AS trainer, training.location AS location, training.type AS type, training.meeting_point AS meeting_point, training.enemy AS enemy, teams.need_reason AS need_reason
		FROM `training` INNER JOIN (role, teams) ON (training.teamID = role.tid AND training.teamID=teams.id) WHERE date>='" . date ( "Y-m-d" ) . "' AND username='$username' AND deleted='0' ORDER BY date ASC, time_start ASC" );
	}

	
	private static function getTID($trainingsID){
		$res = DatabaseUtil::executeQuery("SELECT trainingsID FROM training WHERE id='$trainingsID'");
		$row = mysql_fetch_assoc($res);
		return $row["trainingsID"];
	}

	private static function getNotSubscribedPersons($trainingsID) {
		$resUsernames = DatabaseUtil::executeQuery ( "SELECT DISTINCT * FROM user INNER JOIN (role) ON (role.username=user.username) INNER JOIN (training) ON (training.teamID=tid) WHERE training.id = '$trainingsID' AND activate='1' AND NOT EXISTS (SELECT username FROM subscribed_for_training AS b WHERE trainingsID ='$trainingsID' AND user.username = b.username)" );
		$subscribedList = "";
		$first = true;
		while ( $row = mysql_fetch_array ( $resUsernames ) ) {
			$tmpUsername = $row["username"];
			$res = DatabaseUtil::executeQuery ( "SELECT * FROM `user`
					WHERE username = '$tmpUsername'" );
			while ( $user = mysql_fetch_assoc ( $res ) ) {
				$username = $user["username"];
				$name = $user["name"];
				$firstname = $user["firstname"];
				if($first){
					$subscribedList .= "{";
					$first = false;
				}else{
					$subscribedList .= ",{";
				}
				$subscribedList .= "\"username\": \"$username\",";
				$subscribedList .= "\"name\": \"$name\",";
				$subscribedList .= "\"firstname\": \"$firstname\",";
				$subscribedList .= "\"trainingsID\": \"$trainingsID\"";
				$subscribedList .= "}";
			}
		}
		return $subscribedList;
	}
	
	private static function getSubscribedPersons($trainingsID, $subscribed) {
		$resUsernames = DatabaseUtil::executeQuery ( "SELECT DISTINCT username FROM `subscribed_for_training`
				WHERE trainingsID = '$trainingsID' AND subscribe_type='$subscribed'" );
		$subscribedList = "";
		$first = true;
		while ( $row = mysql_fetch_assoc ( $resUsernames ) ) {
			$tmpUsername = $row["username"];
			$res = DatabaseUtil::executeQuery ( "SELECT * FROM `user` WHERE username = '$tmpUsername' AND activate='1'" );
			while ( $user = mysql_fetch_assoc ( $res ) ) {
			$username = $user["username"];
			$name = $user["name"];
			$firstname = $user["firstname"];
			if($first){
					$subscribedList .= "{";
					$first = false;
				}else{
					$subscribedList .= ",{";
				}
				$subscribedList .= "\"username\": \"$username\",";
				$subscribedList .= "\"name\": \"$name\",";
				$subscribedList .= "\"firstname\": \"$firstname\",";
				$subscribedList .= "\"trainingsID\": \"$trainingsID\"";
				$subscribedList .= "}";
			}
		}
		return $subscribedList;
	}
	
	public static function subscribeForTraining($username, $subscribeType, $trainingsID) {
		$allreadySubscribed = DatabaseUtil::executeQuery ( "SELECT * FROM subscribed_for_training WHERE username = '$username' AND trainingsID = '$trainingsID'" );
		if (mysql_num_rows ( $allreadySubscribed ) > 0) {
			DatabaseUtil::executeQuery ( "UPDATE subscribed_for_training SET subscribe_type = '$subscribeType' WHERE trainingsID='$trainingsID' AND username='$username'" );
		} else {
			DatabaseUtil::executeQuery ( "INSERT INTO subscribed_for_training (username, subscribe_type, trainingsID) VALUES ('$username', '$subscribeType', '$trainingsID')" );
		}
	}
	
	/**
	 * Returns the name of a team.
	 * $teamID takes the ID of a team as input.
	 * return the name of the team.
	 */
	private static function getTeamName($teamID){
		$res = DatabaseUtil::executeQuery("SELECT name FROM teams WHERE id = '$teamID'");
		while($row = mysql_fetch_assoc($res)){
			return $row["name"];
		}
	}
	
	/**
	 * Selects all future trainings for the current user.	
	 * @return string Returns a json-array that holds the trainings.
	 */
	public static function getTraining() {
		$username = $_SESSION["user"]["username"];
		return DatabaseUtil::executeQueryAsJSON( "SELECT training.id AS id, training.date AS date, training.day AS day, training.time_start AS time_start, training.time_end AS time_end, training.teamID AS teamID, role.admin AS admin, role.trainer AS trainer, training.location AS location, training.type AS type, training.meeting_point AS meeting_point, training.enemy AS enemy, teams.need_reason AS need_reason
		FROM `training` INNER JOIN (role, teams) ON (training.teamID = role.tid AND training.teamID=teams.id) WHERE date>='" . date ( "Y-m-d" ) . "' AND username='$username' AND deleted='0' ORDER BY date ASC, time_start ASC" );
		/*$returnValue = "[";
		$username = $_SESSION["user"]["username"];
		$res = self::selectTrainings($username);
		$first = true;
		while($row = mysql_fetch_assoc($res)){
			if(!$first){
				$returnValue .= ",";
			}else{
				$first = false;
			}
			$id = $row["id"];
			$returnValue .= "{";
 			$returnValue .= "\"id\": $id,";
 			$day = date("l", strtotime($row[date]));
 			$day = self::$dayTranslate[$day];
 			$notification = DatabaseUtil::executeQueryAsJSON("SELECT id, title, message FROM `training_notification` WHERE trainingID='$id'");
			$returnValue .= "\"day\": \"$day\",";
			$date = date ( "j. F Y", strtotime($row[date]));
			$returnValue .= "\"date\": \"$date\",";
			$returnValue .= "\"time\": \"$row[time_start] - $row[time_end]\",";
 			$returnValue .= "\"team\": \"team-$row[teamID]\",";
			$returnValue .= "\"admin\": \"$row[admin]\",";
			$returnValue .= "\"trainer\": \"row[trainer]\",";
			$returnValue .= "\"location\": \"$row[location]\",";
			$returnValue .= "\"type\": \"$row[type]\",";
			$returnValue .= "\"meetingPoint\": \"$row[meeting_point]\",";
			$returnValue .= "\"enemy\": \"$row[enemy]\",";
			$returnValue .= "\"need_reason\": \"$row[need_reason]\",";
			$returnValue .= "\"subscribed\": [" . self::getSubscribedPersons($id, 1) . "],";
			$returnValue .= "\"unsubscribed\": [" . self::getSubscribedPersons($id, 0) . "],";
			$returnValue .= "\"notSubscribed\": [" . self::getNotSubscribedPersons($id) . "],";
			$returnValue .= "\"notification\": $notification";
			$returnValue .= "}";
		}
 		$returnValue .= "]";
		return $returnValue;*/
	}
	
	
	public static function getNextTraining($type) {
		$returnValue = "";
		$res = DatabaseUtil::executeQuery ( "SELECT * FROM `training` WHERE type='$type' AND date>='" . date ( "Y-m-d" ) . "' ORDER BY date ASC" );
		$row = mysql_fetch_array ( $res );
		$id = $row ['id'];
		$date = date ( "l j. F Y", strtotime ( $row [date] ) );
		$id_date = "$date $row[time_start] - $row[time_end] $row[location]";
		return $id_date;
	}
	public static function createNextTrainings() {
		$nextWeeks = 4; // Wieviele Wochen im voraus ein training erzeugt werden soll.
		$res = DatabaseUtil::executeQuery ( "SELECT * FROM default_training" );
		while ( $row = mysql_fetch_array ( $res ) ) {
			for($k = 0; $k < 7 * $nextWeeks; $k ++) {
				$date = mktime ( 0, 0, 0, date ( "m" ), date ( "d" ) + $k, date ( "Y" ) );
				if ($row ['day'] == date ( "l", $date )) {
					$time = date ( "Y-m-d", $date );
					$res2 = DatabaseUtil::executeQuery ( "SELECT * FROM `training` WHERE location='$row[location]' AND time_start='$row[time_start]' AND date='$time' AND type='$row[type]' AND teamID='$row[teamID]'" );
					if (mysql_num_rows ( $res2 ) < 1) {
						DatabaseUtil::executeQuery ( "INSERT INTO `training` (location, time_start, time_end, date, day, type, trainingsID, teamID) VALUES ('$row[location]', '$row[time_start]', '$row[time_end]', '$time', '$row[day]', '$row[type]','$row[id]', '$row[teamID]')" );
					}
				}
			}
		}
		self::defaultSignUp();
	}
	
	
	
	private static function defaultSignUp() {
		DatabaseUtil::executeQuery("INSERT INTO subscribed_for_training (username, subscribe_type, trainingsID) SELECT user_defaults.username, user_defaults.subscribe_type, training.id FROM `user_defaults` INNER JOIN (training) ON (user_defaults.trainingsID=training.trainingsID) WHERE NOT EXISTS (SELECT * FROM subscribed_for_training WHERE subscribed_for_training.trainingsID=training.id AND subscribed_for_training.username=user_defaults.username) AND training.date>=CURDATE() AND training.deleted = 0");
		$res = DatabaseUtil::executeQuery("SELECT * FROM `user_defaults` INNER JOIN (training) ON (user_defaults.trainingsID=training.trainingsID) WHERE NOT EXISTS (SELECT * FROM subscribed_for_training WHERE subscribed_for_training.trainingsID=training.id AND subscribed_for_training.username=user_defaults.username) AND training.date>=CURDATE() AND training.deleted = 0");
		/*$res = DatabaseUtil::executeQuery ( "SELECT * FROM user_defaults" );
		while ( $row = mysql_fetch_array ( $res ) ) {
			$username = $row ["username"];
			$subscribeType = $row ["subscribe_type"];
			$trainingsID = $row ["trainingsID"];
			$resTraining = DatabaseUtil::executeQuery("SELECT id FROM `training` WHERE trainingsID = '$trainingsID'");
			/*$resTraining = self::selectTrainings($username);
			while ( $tmp = mysql_fetch_assoc( $resTraining ) ) {
				echo $trainingsID." ".$tmp["id"]."\n";
				if($tmp["id"] == $trainingsID){
					$tid = $tmp ["id"];
					echo "same id";
					$resSubscribed = DatabaseUtil::executeQuery ( "SELECT * FROM subscribed_for_training WHERE trainingsID = '$tid' AND username='$username';" );
					if (mysql_num_rows ( $resSubscribed ) == 0) {
						DatabaseUtil::executeQuery ( "INSERT INTO subscribed_for_training (username, subscribe_type, trainingsID) VALUES ('$username', '$subscribeType', '$tid');" );
					}
				}
			}
		}*/
	}
	
	
	/**
	 * Sets a training as deleted, so it does not show up in the training list.
	 */
	public static function removeTraining($trainingsID) {
		$res = DatabaseUtil::executeQuery ( "UPDATE training SET deleted='1' WHERE id='$trainingsID'" );
	}
	
	/**
	 * Creates a json array with all teams the player is a member of.
	 */
	public static function getTeamFilter($username){
		return DatabaseUtil::executeQueryAsJSON("SELECT * FROM teams WHERE id IN (SELECT tid FROM role WHERE username='$username')");
	}
	
	/**
	 * Creates a new event for a team an stores it in the database.
	 */
	public static function createNewEvent($type, $startTime, $endTime, $date, $location, $meetingPoint, $enemy, $teamID){
		$res = DatabaseUtil::executeQuery("SELECT * FROM `training` WHERE type='$type' AND time_start='$startTime' AND time_end='$endTime' AND date='$date' AND location='$location' AND meeting_point='$meetingPoint' AND enemy='$enemy' AND teamID='$teamID'");
		if(mysql_num_rows($res)==0){
			$day = date ( "l", strtotime ( $date ) );
			//echo $day;
			DatabaseUtil::executeQuery("INSERT INTO `training` (location, time_start, time_end, date, day, type, meeting_point, enemy, teamID) VALUES ('$location', '$startTime', '$endTime', '$date', '$day', '$type', '$meetingPoint', '$enemy', '$teamID')");
		}
	}
	
	public static function getTrainingPlan($trainingsID){
		self::cleanUpTrainingPlan($trainingsID);
		$res = DatabaseUtil::executeQueryAsJSON("SELECT training.id AS trainingsID, title, description, training_plan.time_start, training_plan.time_end, duration, training_plan.id AS id FROM `training` INNER JOIN (training_plan) ON (training.id=training_plan.trainingsID)  WHERE training.id='$trainingsID' AND date>='" . date ( "Y-m-d" ) . "' ORDER BY training_plan.time_start ASC");
		$res2 = DatabaseUtil::executeQueryAsJSON("SELECT * FROM training WHERE id='$trainingsID' AND date>='" . date ( "Y-m-d" ) . "'");
		$returnValue = "[{\"trainingID\": \"$trainingsID\", \"training\": $res2, \"trainingPlan\": $res}]";
		return $returnValue;
	}
	
	public static function updateExerciseTitle($id, $title){
		$res = DatabaseUtil::executeQuery("SELECT description, duration FROM `exercises` WHERE title='$title'");
		if(mysql_num_rows($res)==0){
			DatabaseUtil::executeQuery("UPDATE training_plan SET title = '$title' WHERE id = '$id'");
		}else{
			$row = mysql_fetch_assoc($res);
			DatabaseUtil::executeQuery("UPDATE training_plan SET title='$title', description='$row[description]', duration='$row[duration]' WHERE id='$id'");
			echo "{\"description\": \"$row[description]\", \"duration\": \"$row[duration]\"}";
		}
	}
	
	public static function completeExercise($title){
		$res = DatabaseUtil::executeQuery("SELECT description, duration FROM `exercises` WHERE title='$title'");
		$row = mysql_fetch_assoc($res);
		return "{\"description\": \"$row[description]\", \"duration\": \"$row[duration]\"}";
	}
	
	public static function updateExerciseDescription($id, $description){
		DatabaseUtil::executeQuery("UPDATE training_plan SET description = '$description' WHERE id = '$id'");
	}
	
	public static function updateExerciseDuration($id, $duration, $startTime, $endTime){
		DatabaseUtil::executeQuery("UPDATE training_plan SET duration='$duration', time_start='$startTime', time_end='$endTime'  WHERE id = '$id'");
	}
	
	private static function createExerciseDatabseEntry($title, $description, $duration){
		$res = DatabaseUtil::executeQuery("SELECT id FROM `exercises` WHERE title='$title'");
		if(mysql_num_rows($res)>0){
			//Exercise allready exists. Update data
			DatabaseUtil::executeQuery("UPDATE `exercises` SET description='$description', duration='$duration' WHERE title='$title'");
		}else{
			//Exersice does not exist in databse, create a new one
			DatabaseUtil::executeQuery("INSERT INTO `exercises` (title, description, duration) VALUES ('$title', '$description', '$duration')");
		}
	}
	
	public static function createNewExercise($trainingID, $title, $description, $startTime, $endTime, $duration, $exerciseID){
		echo $exerciseID;
		DatabaseUtil::executeQuery("INSERT INTO `training_plan` (trainingsID, title, description, time_start, time_end, duration) VALUES ('$trainingID', '$title', '$description', '$startTime', '$endTime', '$duration')");
		self::cleanUpTrainingPlan($trainingID);
		self::createExerciseDatabseEntry($title, $description, $duration);
	}
	
	private static function cleanUpTrainingPlan($trainingID){
		self::checkFirstPossibleStartTime($trainingID);
		$res = DatabaseUtil::executeQueryAsArray("SELECT * FROM `training_plan` WHERE trainingsID='$trainingID' ORDER BY time_start ASC, id ASC");
		for($i=0;$i<count($res);$i++){
			$id = $res[$i]['id'];
			if($i>0){
				$res[$i]['time_start'] = $oldEndTime;
			}
			$duration = $res[$i]['duration'];
			$actualStartTime = $res[$i]['time_start'];
			$newEndTime = self::timeAddition($actualStartTime, $duration);
			$res[$i]['time_end'] = $newEndTime;
			$oldEndTime = $newEndTime;
		}
		for($i=0;$i<count($res);$i++){
			$id = $res[$i]['id'];
			$st = $res[$i]['time_start'];
			$et = $res[$i]['time_end'];
			DatabaseUtil::executeQuery("UPDATE `training_plan` SET time_start='$st', time_end='$et' WHERE id='$id'");
		}
	}
	
	
	private static function checkFirstPossibleStartTime($id){
		$res = DatabaseUtil::executeQuery("SELECT time_start FROM `training` WHERE id='$id'");
		$row = mysql_fetch_assoc($res);
		$st = $row['time_start'];
		DatabaseUtil::executeQuery("UPDATE `training_plan` SET time_start='$st' WHERE time_start<'$st'");
	}
	
	private static function timeAddition($time, $duration){
		$timeArray = explode(":", $time);
		$h = (int) $timeArray[0];
		$m = (int) $timeArray[1];
		$m = $m + $duration;
		$addHour = floor($m/60);
		$h = $h + $addHour;
		$m = $m%60;
		if($m < 10){
			$m = "0".$m;
		}
		return $h.":".$m;
	}
	
	
	/**
	 * Calculates the difference in minutes between two time string of format hh:mm.
	 */
	private static function calculateTimeDifference($time1, $time2){
		$t1 = explode(":", $time1);
		$t2 = explode(":", $time2);
		$hDif = $t2[0] - $t1[0];
		$mDif = $t2[1] - $t1[1];
		$res = (60*(int)$hDif)+ (int) $mDif;
		return $res;
	}
	
	public static function getNumberOfPlayersForTraining($trainingID){
		$res = DatabaseUtil::executeQuery("SELECT username FROM `subscribed_for_training` WHERE trainingsID='$trainingID' AND subscribe_type='1'");
		return mysql_num_rows($res);
	}
	
	public static function loadTrainer($trainingID){
		$resTrainerList = DatabaseUtil::executeQueryAsJSON("SELECT user.username, name, firstname FROM `user` INNER JOIN (training, role) ON (training.teamID=role.tid AND role.username=user.username) WHERE role.trainer='1' AND training.id='$trainingID'");
		$resSelectedTrainer = DatabaseUtil::executeQueryAsJSON("SELECT trainer, trainer_assistance FROM `training` WHERE id='$trainingID'");
		$res = "{\"selected\": $resSelectedTrainer, \"trainerList\": $resTrainerList}";
		return $res;
	}
	
	public static function updateTrainer($trainingID, $username){
		DatabaseUtil::executeQuery("UPDATE `training` SET trainer='$username' WHERE id='$trainingID'");
	}
	
	public static function updateTrainerAssistance($trainingID, $username){
		DatabaseUtil::executeQuery("UPDATE `training` SET trainer_assistance='$username' WHERE id='$trainingID'");
	}
	
	public static function getExerciseTitles(){
		$res = DatabaseUtil::executeQueryAsJSON("SELECT title as label FROM exercises");
		return $res;
	}
	
	public static function removeExercise($id){
		DatabaseUtil::executeQuery("DELETE FROM `training_plan` WHERE id='$id'");
	}
	
	public static function addReason($trainingID, $username, $reasonType, $reason){
		echo "INSERT INTO reason (username, trainingsID, reason, reason_type) VALUES ('$username', '$trainingID', '$reason', '$reasonType')";
		DatabaseUtil::executeQuery("INSERT INTO reason (username, trainingsID, reason, reason_type) VALUES ('$username', '$trainingID', '$reason', '$reasonType')");
	}
	
	public static function getReasons(){
		$res = DatabaseUtil::executeQueryAsJSON("SELECT reason_type FROM reason_types");
		return $res;
	}
	
	public static function attendanceCheck(){
		$today = date ( "Y-m-d" );
		$username = $_SESSION['user']['username'];
		$resID = DatabaseUtil::executeQuery("SELECT DISTINCT training.id, teams.id AS team_id, `date`, time_start, time_end, type, teams.name AS team_name FROM `training` INNER JOIN (`role`, `teams`) ON (training.teamID=role.tid AND training.teamID=teams.id) WHERE role.username='$username' AND training.date<='$today' AND training.attendance_check=0 AND training.deleted=0 ORDER BY `date` ASC, time_start ASC");
		$returnArray = array();
		$first = true;
		while($row = mysql_fetch_assoc($resID)){
			$row["users"] = DatabaseUtil::executeQueryAsArrayAssoc("SELECT subscribed_for_training.trainingsID AS id, subscribed_for_training.subscribe_type AS subscribed, user.username AS username, user.name AS name, user.firstname AS firstname FROM `subscribed_for_training` INNER JOIN (`user`) ON (user.username=subscribed_for_training.username) WHERE trainingsID='$row[id]'");
			$returnArray[] = $row;
		}
		return json_encode($returnArray);
		
	}
	
	public static function commitAttendanceCheck($trainingID){
		DatabaseUtil::executeQuery("UPDATE `training` SET attendance_check=1 WHERE id='$trainingID'");
	}
	
	public static function commitAttendanceForUser($trainingID, $username, $subscribed){
		$res = DatabaseUtil::executeQuery("SELECT * FROM `attendance_check` WHERE trainingsID='$trainingID' AND username='$username'");
		if(mysql_num_rows($res)>0){
			DatabaseUtil::executeQuery("UPDATE `attendance_check` SET attendance='$subscribed' WHERE trainingsID='$trainingID' AND username='$username'");
			echo "UPDATE `attendance_check` SET attendance='$subscribed' WHERE trainingsID='$trainingID' AND username='$username'";
		}else{
			DatabaseUtil::executeQuery("INSERT INTO `attendance_check` (trainingsID, username, attendance) VALUES ('$trainingID', '$username', '$subscribed')");
		}
	} 
	
	public static function addTrainingNotification($trainingsID, $notificationTitle, $notificationContent){
		DatabaseUtil::executeQuery("INSERT INTO `training_notification` (trainingID, title, message) VALUES ('$trainingsID', '$notificationTitle', '$notificationContent')");
	}
	
	public static function getEventList(){
		$username = $_SESSION["user"]["username"];
		$res = DatabaseUtil::executeQueryAsJSON("SELECT training.id AS id, training.date AS date, training.time_start AS time_start, training.time_end AS time_end, training.type AS type, training.location AS location, teams.name AS name FROM training LEFT JOIN (role, teams) ON (training.teamID=role.tid AND training.teamID=teams.id) WHERE role.username='$username' AND training.deleted='0'");
		return $res;
	}
	
	public static function getTrainingData($trainingID){
		$res = DatabaseUtil::executeQueryAsJSON("SELECT * FROM training WHERE training.id='$trainingID'");
		return $res;
	}
	
	public static function getTrainingExercises($trainingsID){
		//echo "SELECT training.id AS trainingsID, title, description, training_plan.time_start, training_plan.time_end, duration, training_plan.id AS id FROM `training` INNER JOIN (training_plan) ON (training.id=training_plan.trainingsID)  WHERE training.id='$trainingsID' AND date>='" . date ( "Y-m-d" ) . "' ORDER BY training_plan.time_start ASC";
		$res = DatabaseUtil::executeQueryAsJSON("SELECT training.id AS trainingsID, title, description, training_plan.time_start, training_plan.time_end, duration, training_plan.id AS id, training.date AS date FROM `training` INNER JOIN (training_plan) ON (training.id=training_plan.trainingsID)  WHERE training.id='$trainingsID' ORDER BY training_plan.time_start ASC");
		return $res;
	}
	
	public static function updateFullExercise($id, $title, $description, $time_start, $time_end, $duration){
		DatabaseUtil::executeQuery("UPDATE `training_plan` SET title='$title', description='$description', time_start='$time_start', time_end='$time_end', duration='$duration' WHERE id='$id'");
		echo "success";
	}
	
	public static function loadTrainingById($trainingsID){
		$res  = DatabaseUtil::executeQueryAsJSON("SELECT * FROM `training` WHERE id='$trainingsID'");
		return $res;
	}
	
	public static function updateEvent($trainingsID, $type, $startTime, $endTime, $date, $location, $meetingPoint, $enemy, $teamID){
		$res = DatabaseUtil::executeQuery("UPDATE `training` SET type='$type', time_start='$startTime', time_end='$endTime', date='$date', location='$location', meeting_point='$meetingPoint', enemy='$enemy', teamID='$teamID' WHERE id='$trainingsID'");
		echo DatabaseUtil::executeQueryAsJSON("SELECT * FROM `training` WHERE id='$trainingsID'");
	}
	
	public static function getPersonList($trainingsID, $subscribeType){
		if($subscribeType==-1){
			//echo "SELECT user.username AS username, user.name AS name, user.firstname AS firstname FROM user INNER JOIN (`training`, `role`) ON (role.username=user.username AND role.tid=training.teamID) WHERE user.username NOT IN (SELECT username from `subscribed_for_training` WHERE trainingsID='$trainingsID') AND training.id='$trainingsID'";
			return DatabaseUtil::executeQueryAsJSON("SELECT user.username AS username, user.name AS name, user.firstname AS firstname FROM user INNER JOIN (`training`, `role`) ON (role.username=user.username AND role.tid=training.teamID) WHERE user.username NOT IN (SELECT username from `subscribed_for_training` WHERE trainingsID='$trainingsID') AND training.id='$trainingsID'");
		}
		return DatabaseUtil::executeQueryAsJSON("SELECT user.username AS username, user.name AS name, user.firstname AS firstname FROM user INNER JOIN (`subscribed_for_training`) ON (user.username=subscribed_for_training.username) WHERE subscribe_type='$subscribeType' AND trainingsID='$trainingsID'");
	}
	
	public static function loadNotificationListData($trainingsID){
		return DatabaseUtil::executeQueryAsJSON("SELECT * FROM `training_notification` WHERE trainingID='$trainingsID'");
	}
}

/**
 * Evaluate incoming requests.
 */
$function = $_POST ["function"];
switch ($function) {
	case "subscribeForTraining" :
		$trainingsID = $_POST ["trainingsID"];
		$subscribeType = $_POST ["subscribeType"];
		TrainingUtil::subscribeForTraining ( $_SESSION ["user"] ["username"], $subscribeType, $trainingsID );
		$logger->writeLog($_SESSION["user"]["username"], $function);
		break;
	case "getSideNavbar":
		echo TrainingUtil::getSideNavbar();
		$logger->writeLog($_SESSION["user"]["username"], $function);
		break;
	case "getTraining":
		TrainingUtil::createNextTrainings(); // TODO out-source into a periodic function.
		echo TrainingUtil::getTraining();
		$logger->writeLog($_SESSION["user"]["username"], $function);
		break;
	case "removeTraining" :
		$trainingsID = $_POST ["id"];
		TrainingUtil::removeTraining ( $trainingsID );
		$logger->writeLog($_SESSION["user"]["username"], $function);
		break;
	case "getTeamFilter":
		echo TrainingUtil::getTeamFilter($_SESSION["user"]["username"]);
		$logger->writeLog($_SESSION["user"]["username"], $function);
		break;
	case "createNewEvent":
		TrainingUtil::createNewEvent($_POST["typeField"], $_POST["startTimeField"], $_POST["endTimeField"], $_POST["dateField"], $_POST["locationField"], $_POST["meetingPointField"], $_POST["enemyField"], $_POST["teamField"]);
		$logger->writeLog($_SESSION["user"]["username"], $function);
		break;
	case "getTrainingPlan":
		echo TrainingUtil::getTrainingPlan($_POST["trainingsID"]);
		$logger->writeLog($_SESSION["user"]["username"], $function);
		break;
	case "updateExerciseTitle":
		TrainingUtil::updateExerciseTitle($_POST["id"], $_POST["title"]);
		$logger->writeLog($_SESSION["user"]["username"], $function);
		break;
	case "updateExerciseDescription":
		TrainingUtil::updateExerciseDescription($_POST["id"], $_POST["description"]);
		echo $_POST["description"];
		$logger->writeLog($_SESSION["user"]["username"], $function);
		break;
	case "updateExerciseDuration":
		TrainingUtil::updateExerciseDuration($_POST["id"], $_POST["duration"], $_POST["startTime"], $_POST["endTime"]);
		$logger->writeLog($_SESSION["user"]["username"], $function);
		break;
	case "createNewExercise":
		TrainingUtil::createNewExercise($_POST["trainingID"], $_POST["titleField"], $_POST["descriptionField"], $_POST["startTimeField"], $_POST["endTimeField"], $_POST["durationField"], $_POST["exerciseID"]);
		$logger->writeLog($_SESSION["user"]["username"], $function);
		break;
	case "getNumberOfPlayersForTraining":
		echo TrainingUtil::getNumberOfPlayersForTraining($_POST["trainingID"]);
		$logger->writeLog($_SESSION["user"]["username"], $function);
		break;
	case "loadTrainer":
		echo TrainingUtil::loadTrainer($_POST["trainingID"]);
		$logger->writeLog($_SESSION["user"]["username"], $function);
		break;
	case "updateTrainer":
		TrainingUtil::updateTrainer($_POST["trainingID"], $_POST["username"]);
		$logger->writeLog($_SESSION["user"]["username"], $function);
		break;
	case "updateTrainerAssistance":
		TrainingUtil::updateTrainerAssistance($_POST["trainingID"], $_POST["username"]);
		$logger->writeLog($_SESSION["user"]["username"], $function);
		break;
	case "getExerciseTitles":
		echo TrainingUtil::getExerciseTitles();
		$logger->writeLog($_SESSION["user"]["username"], $function);
		break;
	case "completeExercise":
		echo TrainingUtil::completeExercise($_POST["title"]);
		$logger->writeLog($_SESSION["user"]["username"], $function);
		break;
	case "removeExercise":
		TrainingUtil::removeExercise($_POST["id"]);
		$logger->writeLog($_SESSION["user"]["username"], $function);
		break;
	case "addReason":
		TrainingUtil::addReason($_POST["trainingID"], $_POST["username"], $_POST["reasonType"], $_POST["reason"]);
		$logger->writeLog($_SESSION["user"]["username"], $function);
		break;
	case "getReasons":
		echo TrainingUtil::getReasons();
		$logger->writeLog($_SESSION["user"]["username"], $function);
		break;
	case "attendanceCheck":
		echo TrainingUtil::attendanceCheck();
		$logger->writeLog($_SESSION["user"]["username"], $function);
		break;
	case "commitAttendanceCheck":
		echo TrainingUtil::commitAttendanceCheck($_POST["id"]);
		$logger->writeLog($_SESSION["user"]["username"], $function);
		break;
	case "commitAttendanceForUser":
		echo TrainingUtil::commitAttendanceForUser($_POST["trainingsID"], $_POST["username"], $_POST["subscribed"]);
		$logger->writeLog($_SESSION["user"]["username"], $function);
		break;
	case "addTrainingNotification":
		echo TrainingUtil::addTrainingNotification($_POST["trainingsID"], $_POST["notificationTitle"], $_POST["notificationContent"]);
		$logger->writeLog($_SESSION["user"]["username"], $function);
		break;
	case "getEventList":
		echo TrainingUtil::getEventList();
		$logger->writeLog($_SESSION["user"]["username"], $function);
		break;
	case "getTrainingData":
		echo TrainingUtil::getTrainingData($_POST["trainingID"]);
		$logger->writeLog($_SESSION["user"]["username"], $function);
		break;
	case "getTrainingExercises":
		echo TrainingUtil::getTrainingExercises($_POST["trainingsID"]);
		$logger->writeLog($_SESSION["user"]["username"], $function);
		break;
	case "updateFullExercise":
		TrainingUtil::updateFullExercise($_POST["id"], $_POST["title"], $_POST["description"], $_POST["time_start"], $_POST["time_end"], $_POST["duration"]);
		$logger->writeLog($_SESSION["user"]["username"], $function);
		break;
	case "loadTrainingById":
		echo TrainingUtil::loadTrainingById($_POST["trainingsID"]);
		$logger->writeLog($_SESSION["user"]["username"], $function);
		break;
	case "updateEvent":
		echo TrainingUtil::updateEvent($_POST["trainingsID"], $_POST["typeField"], $_POST["startTimeField"], $_POST["endTimeField"], $_POST["dateField"], $_POST["locationField"], $_POST["meetingPointField"], $_POST["enemyField"], $_POST["teamField"]);
		$logger->writeLog($_SESSION["user"]["username"], $function);
		break;
	case "getPersonList":
		echo TrainingUtil::getPersonList($_POST["trainingsID"], $_POST["subscribeType"]);
		$logger->writeLog($_SESSION["user"]["username"], $function);
		break;
	case "loadNotificationListData":
		echo TrainingUtil::loadNotificationListData($_POST["trainingsID"]);
		$logger->writeLog($_SESSION["user"]["username"], $function);
		break;
	default:
		var_dump($_POST);
		break;
}

?>
