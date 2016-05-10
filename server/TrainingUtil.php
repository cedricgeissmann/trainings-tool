<?php


require_once "../init.php";

/* include_once 'DatabaseUtil.php'; */
/* include_once "LoggerUtil.php"; */

/* $logger = new LoggerUtil(); */

$training = new TrainingUtil();
echo $training->completeExercise('Test');

//echo $training->getTraining();

/**
 * Evaluate incoming requests.
 */
$function = $_POST ["function"];
switch ($function) {
	case "subscribeForTraining" :
		$trainingsID = $_POST ["trainingsID"];
		$subscribeType = $_POST ["subscribeType"];
		$training->subscribeForTraining ( $_SESSION ["user"] ["username"], $subscribeType, $trainingsID );
		/* $logger->writeLog($_SESSION["user"]["username"], $function); */
		break;
	case "getSideNavbar":
		echo $training->getSideNavbar();
		/* $logger->writeLog($_SESSION["user"]["username"], $function); */
		break;
	case "getTraining":
		$training->createNextTrainings(); // TODO out-source into a periodic function.
		echo $training->getTraining();
		/* $logger->writeLog($_SESSION["user"]["username"], $function); */
		break;
	case "removeTraining" :
		$trainingsID = $_POST ["id"];
		$training->removeTraining ( $trainingsID );
		/* $logger->writeLog($_SESSION["user"]["username"], $function); */
		break;
	case "getTeamFilter":
		echo $training->getTeamFilter($_SESSION["user"]["username"]);
		/* $logger->writeLog($_SESSION["user"]["username"], $function); */
		break;
	case "createNewEvent":
		$training->createNewEvent($_POST["typeField"], $_POST["startTimeField"], $_POST["endTimeField"], $_POST["dateField"], $_POST["locationField"], $_POST["meetingPointField"], $_POST["enemyField"], $_POST["teamField"]);
		/* $logger->writeLog($_SESSION["user"]["username"], $function); */
		break;
	case "getTrainingPlan":
		echo $training->getTrainingPlan($_POST["trainingsID"]);
		/* $logger->writeLog($_SESSION["user"]["username"], $function); */
		break;
	case "updateExerciseTitle":
		$training->updateExerciseTitle($_POST["id"], $_POST["title"]);
		/* $logger->writeLog($_SESSION["user"]["username"], $function); */
		break;
	case "updateExerciseDescription":
		$training->updateExerciseDescription($_POST["id"], $_POST["description"]);
		echo $_POST["description"];
		/* $logger->writeLog($_SESSION["user"]["username"], $function); */
		break;
	case "updateExerciseDuration":
		$training->updateExerciseDuration($_POST["id"], $_POST["duration"], $_POST["startTime"], $_POST["endTime"]);
		/* $logger->writeLog($_SESSION["user"]["username"], $function); */
		break;
	case "createNewExercise":
		$training->createNewExercise($_POST["trainingID"], $_POST["titleField"], $_POST["descriptionField"], $_POST["startTimeField"], $_POST["endTimeField"], $_POST["durationField"], $_POST["exerciseID"]);
		/* $logger->writeLog($_SESSION["user"]["username"], $function); */
		break;
	case "getNumberOfPlayersForTraining":
		echo $training->getNumberOfPlayersForTraining($_POST["trainingID"]);
		/* $logger->writeLog($_SESSION["user"]["username"], $function); */
		break;
	case "loadTrainer":
		echo $training->loadTrainer($_POST["trainingID"]);
		/* $logger->writeLog($_SESSION["user"]["username"], $function); */
		break;
	case "updateTrainer":
		$training->updateTrainer($_POST["trainingID"], $_POST["username"]);
		/* $logger->writeLog($_SESSION["user"]["username"], $function); */
		break;
	case "updateTrainerAssistance":
		$training->updateTrainerAssistance($_POST["trainingID"], $_POST["username"]);
		/* $logger->writeLog($_SESSION["user"]["username"], $function); */
		break;
	case "getExerciseTitles":
		echo $training->getExerciseTitles();
		/* $logger->writeLog($_SESSION["user"]["username"], $function); */
		break;
	case "completeExercise":
		echo $training->completeExercise($_POST["title"]);
		/* $logger->writeLog($_SESSION["user"]["username"], $function); */
		break;
	case "removeExercise":
		$training->removeExercise($_POST["id"]);
		/* $logger->writeLog($_SESSION["user"]["username"], $function); */
		break;
	case "addReason":
		$training->addReason($_POST["trainingID"], $_POST["username"], $_POST["reasonType"], $_POST["reason"]);
		/* $logger->writeLog($_SESSION["user"]["username"], $function); */
		break;
	case "getReasons":
		echo $training->getReasons();
		/* $logger->writeLog($_SESSION["user"]["username"], $function); */
		break;
	case "attendanceCheck":
		echo $training->attendanceCheck();
		/* $logger->writeLog($_SESSION["user"]["username"], $function); */
		break;
	case "commitAttendanceCheck":
		echo $training->commitAttendanceCheck($_POST["id"]);
		/* $logger->writeLog($_SESSION["user"]["username"], $function); */
		break;
	case "commitAttendanceForUser":
		echo $training->commitAttendanceForUser($_POST["trainingsID"], $_POST["username"], $_POST["subscribed"]);
		/* $logger->writeLog($_SESSION["user"]["username"], $function); */
		break;
	case "addTrainingNotification":
		echo $training->addTrainingNotification($_POST["trainingsID"], $_POST["notificationTitle"], $_POST["notificationContent"]);
		/* $logger->writeLog($_SESSION["user"]["username"], $function); */
		break;
	case "getEventList":
		echo $training->getEventList();
		/* $logger->writeLog($_SESSION["user"]["username"], $function); */
		break;
	case "getTrainingData":
		echo $training->getTrainingData($_POST["trainingID"]);
		/* $logger->writeLog($_SESSION["user"]["username"], $function); */
		break;
	case "getTrainingExercises":
		echo $training->getTrainingExercises($_POST["trainingsID"]);
		/* $logger->writeLog($_SESSION["user"]["username"], $function); */
		break;
	case "updateFullExercise":
		$training->updateFullExercise($_POST["id"], $_POST["title"], $_POST["description"], $_POST["time_start"], $_POST["time_end"], $_POST["duration"]);
		/* $logger->writeLog($_SESSION["user"]["username"], $function); */
		break;
	case "loadTrainingById":
		echo $training->loadTrainingById($_POST["trainingsID"]);
		/* $logger->writeLog($_SESSION["user"]["username"], $function); */
		break;
	case "updateEvent":
		echo $training->updateEvent($_POST["trainingsID"], $_POST["typeField"], $_POST["startTimeField"], $_POST["endTimeField"], $_POST["dateField"], $_POST["locationField"], $_POST["meetingPointField"], $_POST["enemyField"], $_POST["teamField"]);
		/* $logger->writeLog($_SESSION["user"]["username"], $function); */
		break;
	case "getPersonList":
		echo $training->getPersonList($_POST["trainingsID"], $_POST["subscribeType"]);
		/* $logger->writeLog($_SESSION["user"]["username"], $function); */
		break;
	case "loadNotificationListData":
		echo $training->loadNotificationListData($_POST["trainingsID"]);
		/* $logger->writeLog($_SESSION["user"]["username"], $function); */
		break;
	case "getSessionsUsername":		//TODO outsource to other class.
		echo $_SESSION["user"]["username"];
		break;
	default:
		var_dump($_POST);
		break;
}

?>
