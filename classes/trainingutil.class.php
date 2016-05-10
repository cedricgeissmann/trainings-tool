<?php

/**
 * @router_may_call
 */
class TrainingUtil {
	public static $types = array (
			'training' => 'Trainings',
			'game' => 'Spiele',
			'beach' => 'Beach',
			'tournament' => 'Turniere' 
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

	/**
	 *
	 * PASS
	 *
	 *
	 * This class may only be used if the user is logged in.
	 */
	public function __construct(){
		$auth = new Auth();
		$auth->needs_login();
		$this->db = new DBConnection();
	}
	

	/**
	 *
	 *
	 * PASS
	 *
	 * This method does not need to be tested, since it only returns data from the database.
	 *
	 * Returns a JSON-array, that contains all the players, that are not subscribed for the training with the specified ID.
	 * @param Integer $trainingsID is the id of the training, for which the not subscribed players are selected.
	 * @returns JSON-array an array that contains all the not subscribed players int the form [{username: ..., firstname: ..., name: ..., trainingsID: ...}]
	 */
	private function getNotSubscribedPersons($trainingsID) {
		$resUsernames = $this->db->select("SELECT DISTINCT user.username AS username, user.firstname AS firstname, user.name AS name, training.id AS trainingsID FROM user INNER JOIN (role) ON (role.username=user.username) INNER JOIN (training) ON (training.teamID=tid) WHERE training.id = '$trainingsID' AND activate='1' AND NOT EXISTS (SELECT username FROM subscribed_for_training AS b WHERE trainingsID ='$trainingsID' AND user.username = b.username)" );
		return $resUsernames["response"];
	}
	
	/**
	 *
	 *
	 * PASS
	 *
	 * Returns a JSON-array, that contains all the players, that are subscribed for the training with the specified ID.
	 * @param Integer $trainingsID is the id of the training, for which the not subscribed players are selected.
	 * @param Integer $subscribed this Integer can be 0 or 1. If 1 all the subscribed players are selected. If 0 all the unsubscribed players are selected.
	 * @returns JSON-array an array that contains all the subscribed players int the form [{username: ..., firstname: ..., name: ..., trainingsID: ...}]
	 */
	private function getSubscribedPersons($trainingsID, $subscribed) {
		$res = $this->db->select("SELECT DISTINCT user.username AS username, user.firstname AS firstname, user.name AS name, subscribed_for_training.trainingsID AS trainingsID FROM subscribed_for_training INNER JOIN (user) ON (user.username=subscribed_for_training.username) WHERE subscribed_for_training.trainingsID='$trainingsID' AND subscribed_for_training.subscribe_type='$subscribed'");
		return $res["response"];
	}
	
	/**
	 *
	 * PASS
	 *
	 *
	 *
	 * @router_may_call
	 * This function does not need testing.
	 */
	public function subscribeForTraining($args) {
		$username = $_SESSION["user"]["username"];
		$subscribeType = $args["subscribeType"];
		$trainingsID = $args["trainingsID"];
		if( $this->db->exists( "SELECT * FROM subscribed_for_training WHERE username = '$username' AND trainingsID = '$trainingsID'" ) ){
			$this->db->update( "UPDATE subscribed_for_training SET subscribe_type = '$subscribeType' WHERE trainingsID='$trainingsID' AND username='$username'" );
		} else {
			$this->db->insert("INSERT INTO subscribed_for_training (username, subscribe_type, trainingsID) VALUES ('$username', '$subscribeType', '$trainingsID')" );
		}
	}
	
	
	/**
	 * Gives an integer value if the current user is admin or trainer. 1 if eigther of these is true, 0 if both are false.
	 * @returns integer 1 if true, 0 if false.
	 */
	 private function getAdminOrTrainer(){
	 	$username = $_SESSION["user"]["username"];
	 	if( $this->db->exists("SELECT username FROM role WHERE (trainer='1' OR admin='1') AND username='$username'") ){
	 		return 1;
	 	}
	 	return 0;
	 }




	/**
	 * Returns the name of a team.
	 * $teamID takes the ID of a team as input.
	 * return the name of the team.
	 */
	private function getTeamName($teamID){
		$res = $this->db->select("SELECT name FROM teams WHERE id = '$teamID'");
		return $res["response"]["name"];
		
	}


	
	/**
	 *
	 * PASS
	 *
	 *
	 * Selects all future trainings for the current user.	
	 * @router_may_call
	 * @return string Returns a json-array that holds the trainings.
	 */
	public function getTraining() {

		$this->createNextTrainings();




		$username = $_SESSION["user"]["username"];
		/* $res = $this->db->select( "SELECT training.id AS id, training.date AS date, training.day AS day, training.time_start AS time_start, training.time_end AS time_end, training.teamID AS teamID, role.admin AS admin, role.trainer AS trainer, training.location AS location, training.type AS type, training.meeting_point AS meeting_point, training.enemy AS enemy, teams.need_reason AS need_reason */
		/* FROM `training` INNER JOIN (role, teams) ON (training.teamID = role.tid AND training.teamID=teams.id) WHERE date>='" . date ( "Y-m-d" ) . "' AND username='$username' AND deleted='0' ORDER BY date ASC, time_start ASC" ); */
		/* return json_encode($res["response"]); */
		$res = $this->db->select("SELECT * FROM future_trainings");



		$json_obj = $res["response"];
		foreach($json_obj as &$item){
			$id = $item["id"];
			$item["numberOfPlayers"] = $this->getNumberOfPlayersForTraining($id);
			$item["subscribed"] = $this->getSubscribedPersons($id, 1);
			$item["unsubscribed"] = $this->getSubscribedPersons($id, 0);
			$item["notSubscribed"] = $this->getNotSubscribedPersons($id);
			$item["notifications"] = $this->loadNotificationListData($id);
			$item["adminOrTrainer"] = $this->getAdminOrTrainer();
			$item["teamName"] = $this->getTeamName($item["teamID"]);
		}
		$res = json_encode($json_obj);
		/* return "{\"panels\": $res}"; */
		
		
		
		return array("panels" => $json_obj);
	}
	
	/**
	 */
	public function createNextTrainings() {
		$nextWeeks = 4; // Wieviele Wochen im voraus ein training erzeugt werden soll.
		$res = $this->db->select( "SELECT * FROM default_training" );
		foreach( $res["response"] as &$row ) {
			for($k = 0; $k < 7 * $nextWeeks; $k ++) {
				$date = mktime ( 0, 0, 0, date ( "m" ), date ( "d" ) + $k, date ( "Y" ) );
				if ($row ['day'] == date ( "l", $date )) {
					$time = date ( "Y-m-d", $date );
					if( ! $this->db->exists( "SELECT * FROM `training` WHERE location='$row[location]' AND time_start='$row[time_start]' AND date='$time' AND type='$row[type]' AND teamID='$row[teamID]'" ) ){
						$this->db->insert ( "INSERT INTO `training` (location, time_start, time_end, date, day, type, trainingsID, teamID) VALUES ('$row[location]', '$row[time_start]', '$row[time_end]', '$time', '$row[day]', '$row[type]','$row[id]', '$row[teamID]')" );
					}
				}
			}
		}
		$this->defaultSignUp();
	}
	
	private function defaultSignUp() {
		$this->db->insert("INSERT INTO subscribed_for_training (username, subscribe_type, trainingsID) SELECT user_defaults.username, user_defaults.subscribe_type, training.id FROM `user_defaults` INNER JOIN (training) ON (user_defaults.trainingsID=training.trainingsID) WHERE NOT EXISTS (SELECT * FROM subscribed_for_training WHERE subscribed_for_training.trainingsID=training.id AND subscribed_for_training.username=user_defaults.username) AND training.date>=CURDATE() AND training.deleted = 0");
	}
	
	
	/**
	 * Sets a training as deleted, so it does not show up in the training list.
	 */
	public function removeTraining($trainingsID) {
		$res = $this->db->update( "UPDATE training SET deleted='1' WHERE id='$trainingsID'" );
	}
	
	/**
	 * TEST: manual works
	 * Creates a json array with all teams the player is a member of.
	 */
	public function getTeamFilter($username){
		$res = $this->db->select("SELECT * FROM teams WHERE id IN (SELECT tid FROM role WHERE username='$username')");
		$res = json_encode($res["response"]);
		return "{\"teams\": $res}";
	}
	
	/**
	 * TEST: manual works
	 * Creates a new event for a team an stores it in the database.
	 */
	public function createNewEvent($type, $startTime, $endTime, $date, $location, $meetingPoint, $enemy, $teamID){
		if( ! $this->db->exists("SELECT * FROM `training` WHERE type='$type' AND time_start='$startTime' AND time_end='$endTime' AND date='$date' AND location='$location' AND meeting_point='$meetingPoint' AND enemy='$enemy' AND teamID='$teamID'") ){
			$day = date ( "l", strtotime ( $date ) );
			$this->db->insert("INSERT INTO `training` (location, time_start, time_end, date, day, type, meeting_point, enemy, teamID) VALUES ('$location', '$startTime', '$endTime', '$date', '$day', '$type', '$meetingPoint', '$enemy', '$teamID')");
		}
	}
	
	public function getTrainingPlan($trainingsID){
		$this->cleanUpTrainingPlan($trainingsID);
		$res = $this->db->select("SELECT trainingsID, title, description, time_start, time_end, duration, id FROM `training_plan_view` WHERE trainingsID='$trainingsID' ORDER BY time_start ASC");
		$res = $res["response"];
		$res2 = $this->db->select("SELECT * FROM training WHERE id='$trainingsID'");
		$res2 = $res2["response"];
		$returnValue = array(
			trainingsID => $trainingsID,
			training => $res2,
			trainingsPlan => $res
		);
		return json_encode($returnValue);
	}
	
	public function updateExerciseTitle($id, $title){
		$res = $this->db->exists("SELECT description, duration FROM `exercises` WHERE title='$title'");
		if( $res["number_of_rows"] == 0 ){
			$this->db->update("UPDATE training_plan SET title = '$title' WHERE id = '$id'");
		}else{
			$row = $res["response"];
			$this->db->update("UPDATE training_plan SET title='$title', description='$row[description]', duration='$row[duration]' WHERE id='$id'");
			$return_value = array(
				description => $row["description"],
				duration => $row["duration"]
			);
			echo json_encode($return_value);
		}
	}
	
	/**
	 * Gets the description that matches an exercise title and returns the description and the duration in a JSON-Object.
	 */
	public function completeExercise($title){
		$res = $this->db->select("SELECT description, duration FROM `exercises` WHERE title='$title'");
		$row = $res["response"];
		$return_value = array(
			description => $row["description"],
			duration => $row["duration"]
		);
		echo json_encode($return_value);
	}
	
	public function updateExerciseDescription($id, $description){
		$this->db->update("UPDATE training_plan SET description = '$description' WHERE id = '$id'");
	}
	
	public function updateExerciseDuration($id, $duration, $startTime, $endTime){
		$this->db->update("UPDATE training_plan SET duration='$duration', time_start='$startTime', time_end='$endTime'  WHERE id = '$id'");
	}
	
	private function createExerciseDatabseEntry($title, $description, $duration){
		if( $this->db->exists("SELECT id FROM `exercises` WHERE title='$title'") ){
			//Exercise allready exists. Update data
			$this->db->update("UPDATE `exercises` SET description='$description', duration='$duration' WHERE title='$title'");
		}else{
			//Exersice does not exist in databse, create a new one
			$this->db->insert("INSERT INTO `exercises` (title, description, duration) VALUES ('$title', '$description', '$duration')");
		}
	}
	
	public function createNewExercise($trainingID, $title, $description, $startTime, $endTime, $duration, $exerciseID){
		$this->db->insert("INSERT INTO `training_plan` (trainingsID, title, description, time_start, time_end, duration) VALUES ('$trainingID', '$title', '$description', '$startTime', '$endTime', '$duration')");
		$this->cleanUpTrainingPlan($trainingID);
		$this->createExerciseDatabseEntry($title, $description, $duration);
	}
	
	private function cleanUpTrainingPlan($trainingID){
		$this->checkFirstPossibleStartTime($trainingID);
		$res = $this->db->select("SELECT * FROM `training_plan` WHERE trainingsID='$trainingID' ORDER BY time_start ASC, id ASC");
		$res = $res["response"];
		for($i=0;$i<count($res);$i++){
			$id = $res[$i]['id'];
			if($i>0){
				$res[$i]['time_start'] = $oldEndTime;
			}
			$duration = $res[$i]['duration'];
			$actualStartTime = $res[$i]['time_start'];
			$newEndTime = $this->timeAddition($actualStartTime, $duration);
			$res[$i]['time_end'] = $newEndTime;
			$oldEndTime = $newEndTime;
		}
		for($i=0;$i<count($res);$i++){
			$id = $res[$i]['id'];
			$st = $res[$i]['time_start'];
			$et = $res[$i]['time_end'];
			$this->db->update("UPDATE `training_plan` SET time_start='$st', time_end='$et' WHERE id='$id'");
		}
	}
	
	
	private function checkFirstPossibleStartTime($id){
		$res = $this->db->select("SELECT time_start FROM `training` WHERE id='$id'");
		$st = $res["response"]['time_start'];
		$this->db->update("UPDATE `training_plan` SET time_start='$st' WHERE time_start<'$st'");
	}
	
	private function timeAddition($time, $duration){
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
	
	
	public function getNumberOfPlayersForTraining($trainingID){
		$res = $this->db->select("SELECT username FROM `subscribed_for_training` WHERE trainingsID='$trainingID' AND subscribe_type='1'");
		return $res["number_of_rows"];
	}
	
	public function loadTrainer($trainingID){
		$resTrainerList = $this->db->select("SELECT username, name, firstname FROM `trainers_view` WHERE id='$trainingID'");
		$resSelectedTrainer = $this->db->select("SELECT trainer, trainer_assistance FROM `training` WHERE id='$trainingID'");
		$res = "{\"selected\": $resSelectedTrainer, \"trainerList\": $resTrainerList}";
		$res = array(
			selected => $resSelectedTrainer["response"],
			trainerList => $resTrainerList["response"]
		);
		return json_encode($res);
	}
	
	public function updateTrainer($trainingID, $username){
		$this->db->update("UPDATE `training` SET trainer='$username' WHERE id='$trainingID'");
	}
	
	public function updateTrainerAssistance($trainingID, $username){
		$this->db->update("UPDATE `training` SET trainer_assistance='$username' WHERE id='$trainingID'");
	}
	
	public function getExerciseTitles(){
		$res = $this->db->select("SELECT title as label FROM exercises");
		return json_encode($res["resonse"]);
	}
	
	public function removeExercise($id){
		$this->db->delete("DELETE FROM `training_plan` WHERE id='$id'");
	}
	
	
	public function selectTrainingsWithTrainersAllowedForAttendanceCheck(){
		$username = $_SESSION["user"]["username"];
		$resID = $this->db->select("SELECT * FROM allowed_for_attendance_check WHERE username='$username' ORDER BY `date` ASC, time_start ASC");
		return $resID["response"];
	}

	public function attendanceCheck(){
		$resID = $this->selectTrainingsWithTrainersAllowedForAttendanceCheck();
		$returnArray = array();
		foreach( $resID as $row){
			$res_tmp = $this->db->select("SELECT subscribed_for_training.trainingsID AS id, subscribed_for_training.subscribe_type AS subscribed, user.username AS username, user.name AS name, user.firstname AS firstname FROM `subscribed_for_training` INNER JOIN (`user`) ON (user.username=subscribed_for_training.username) WHERE trainingsID='$row[id]'");
			$returnArray[] = $res_tmp;
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
	
	/**
	 * Creates a JSON-array with all the notifications for the event with the specified ID.
	 * @param Integer $trainingsID the Id of the event for which all notifications are loaded.
	 * @returns JSON-array with all the notifications for the specified event in the form [{id: ..., trainingID: ..., title: ..., message: ...}]
	 */
	public function loadNotificationListData($trainingsID){
		$res = $this->db->select("SELECT * FROM `training_notification` WHERE trainingID='$trainingsID'");
		return $res["response"];
	}
}

?>
