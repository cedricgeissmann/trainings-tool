<?php
include 'DatabaseUtil.php';
DatabaseUtil::startSession ();
class Training {
	public static $types = array (
			'training' => 'Trainings',
			'game' => 'Spiele',
			'beach' => 'Beach',
			'tournament' => 'Tourniere' 
	);
	
	
	private static function selectTrainings($username){
		return DatabaseUtil::executeQuery ( "SELECT * FROM `training` INNER JOIN (team_member) ON (training.teamID = team_member.tid) WHERE date>='" . date ( "Y-m-d" ) . "' AND username='$username' AND deleted='0' ORDER BY type DESC, date ASC, time_start ASC" );
	}
	
	public static function getSideNavbar() {
		$username = $_SESSION['user']['username'];
		$res = self::selectTrainings($username);
		$sideNavbar = "<ul id='trainingsNavbar' class='nav bs-sidenav nav-stacked'>";
		$oldType = "";
		while ( $row = mysql_fetch_assoc ( $res ) ) {
			if ($oldType != $row ["type"]) {
				$oldType = $row ["type"];
				$sideNavbar .= "<li class='nav-header'>" . self::$types [$oldType] . "</li>"; // TODO insert type
			}
			$sideNavbar .= self::addTrainingsNavbarEntry ( $row );
		}
		$sideNavbar .= "</ul>";
		return $sideNavbar;
	}
	
	private static function getHeader($id, $id_date) {
		$header = "<div class='row'>";
		$header .= "<h4 name='$id' class='col-xs-10'>$id_date</h4>";
		if ($_SESSION ["user"] ["admin"] == 1) {
			$header .= "<button class='btn btn-default col-xs-2' onclick='removeTraining(\"$id\")'>Entfernen</button>";
		}
		$header .= "</div>";
		return $header;
	}
	private static function getNotSubscribed($id) {
		$htmlString = "<div class='col-sm-4'>
				<h3>Nicht gemeldet</h3>" . self::getNotSubscribedPersons ( $id ) . "</div>";
		return $htmlString;
	}
	private static function getSubscribed($id) {
		$htmlString = "";
		if ($_SESSION ["user"] ["admin"] == 1) {
			$htmlString .= "<div class='col-sm-4'>";
		} else {
			$htmlString .= "<div class='col-sm-6'>";
		}
		$htmlString .= "<h3>Angemeldet</h3>" . self::getSubscribedPersons ( $id, 1 ) . "<button class='btn btn-default' onclick='subscribe(\"$id\")'>Anmelden</button>
				</div>";
		return $htmlString;
	}
	private static function getUnsubscribed($id) {
		$htmlString = "";
		if ($_SESSION ["user"] ["admin"] == 1) {
			$htmlString .= "<div class='col-sm-4'>";
		} else {
			$htmlString .= "<div class='col-sm-6'>";
		}
		$htmlString .= "<h3>Abgemeldet</h3>" . self::getSubscribedPersons ( $id, 0 ) . "<button class='btn btn-default' onclick='unsubscribe(\"$id\")'>Abmelden</button>
				</div>";
		return $htmlString;
	}
	
	private static function getTID($trainingsID){
		$res = DatabaseUtil::executeQuery("SELECT trainingsID FROM training WHERE id='$trainingsID'");
		$row = mysql_fetch_assoc($res);
		return $row["trainingsID"];
	}
	
	private static function createAdminButton($user, $trainingsID) {
		$adminButton .= "<button class='btn btn-default dropdown-toggle' data-toggle='dropdown'><span class='caret'></span></button>";
		$args = "'$user[username]', '$trainingsID'";
		$tid = self::getTID($trainingsID);
		// TODO make switches: <li><div class='make-switch'><input type='checkbox' checked /></div></li>
		$adminButton .= "<ul class='dropdown-menu'>
                  <li><a href='#' onclick=\"subscribeFromAdmin($args)\">Spieler anmelden</a></li>
                  <li><a href='#' onclick=\"unsubscribeFromAdmin($args)\">Spieler abmelden</a></li>
                  <li><a href='#' onclick=\"removeFromTrainingFromAdmin($args)\">Spieler entfernen</a></li>
                  <li><a href='#' onclick=\"defaultSubscribeForTrainingFromAdmin('$user[username]', '$tid', '1')\">Spieler immer anmelden</a></li>
                  <li><a href='#' onclick=\"defaultSubscribeForTrainingFromAdmin('$user[username]', '$tid', '0')\">Spieler immer abmelden</a></li>
                  <li class='divider'></li>
                  <li><a href='#' onclick=\"activate('$user[username]', '1')\">Freischalten</a></li>
                  <li><a href='#' onclick=\"activate('$user[username]', '0')\">Sperren</a></li>
                  <li><a href='#' onclick=\"changeTrainer('$user[username]', '1')\">Trainerrechte gewähren</a></li>
                  <li><a href='#' onclick=\"changeTrainer('$user[username]', '0')\">Trainerrechte verwerfen</a></li>
                  <li><a href='#' onclick=\"changeAdmin('$user[username]', '1')\">Adminrechte gewähren</a></li>
                  <li><a href='#' onclick=\"changeAdmin('$user[username]', '0')\">Adminrechte verwerfen</a></li>
                  <li class='divider'></li>
                  <li><a href='#' onclick=\"resetPassword('$user[username]')\">Passwort zurücksetzen</a></li>
                  <li><a href='#' onclick=\"deleteUser('$user[username]')\">Benutzer löschen</a></li>
                </ul>";
		return $adminButton;
	}
	private static function getNotSubscribedPersons($trainingsID) {
		$resUsernames = DatabaseUtil::executeQuery ( "SELECT * FROM user INNER JOIN (team_member) ON (team_member.username=user.username) INNER JOIN (training) ON (training.teamID=tid) WHERE training.id = '$trainingsID' AND activate='1' AND NOT EXISTS (SELECT username FROM subscribed_for_training AS b WHERE trainingsID =  '$trainingsID' AND user.username = b.username)" );
		$subscribedList = "";
		while ( $row = mysql_fetch_array ( $resUsernames ) ) {
			$res = DatabaseUtil::executeQuery ( "SELECT * FROM `user`
					WHERE username = '$row[username]'" );
			
			while ( $user = mysql_fetch_assoc ( $res ) ) {
				$subscribedList .= "<div class='btn-group col-xs-12'>";
				$subscribedList .= "<button class='btn btn-default col-xs-10'>$user[firstname] $user[name]</button>";
				if ($_SESSION ["user"] ["admin"]) {
					$subscribedList .= self::createAdminButton ( $user, $trainingsID );
				}
				$subscribedList .= "</div>";
			}
		}
		return $subscribedList;
	}
	private static function getSubscribedPersons($trainingsID, $subscribed) {
		$resUsernames = DatabaseUtil::executeQuery ( "SELECT DISTINCT username FROM `subscribed_for_training`
				WHERE trainingsID = '$trainingsID' AND subscribe_type='$subscribed'" );
		$subscribedList = "";
		while ( $row = mysql_fetch_assoc ( $resUsernames ) ) {
			$res = DatabaseUtil::executeQuery ( "SELECT * FROM `user`
					WHERE username = '$row[username]' AND activate='1'" );
			
			while ( $user = mysql_fetch_assoc ( $res ) ) {
				$subscribedList .= "<div class='btn-group col-xs-12'>";
				$subscribedList .= "<button class='btn btn-default col-xs-10'>$user[firstname] $user[name]</button>";
				if ($_SESSION ["user"] ["admin"]) {
					$subscribedList .= self::createAdminButton ( $user, $trainingsID );
				}
				$subscribedList .= "</div>";
			}
		}
		return $subscribedList;
	}
	private static function addTrainingsNavbarEntry($row) {
		$returnValue = "";
		$id = $row ['id'];
		$date = date ( "l j. F Y", strtotime ( $row [date] ) );
		$returnValue .= "<li><a href=#$id>$date</a></li>";
		return $returnValue;
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
	 *
	 * @param unknown $type        	
	 * @return string
	 */
	public static function getTraining() {
		self::createNextTrainings();
		self::defaultSignUp();
		$returnValue = "";
		$username = $_SESSION["user"]["username"];
		$res = self::selectTrainings($username);
		while ( $row = mysql_fetch_assoc ( $res ) ) {
			$returnValue .= "<div class='panel panel-default'>";
			$id = $row ['id'];
			$date = date ( "l j. F Y", strtotime ( $row [date] ) );
			$id_date = "$date $row[time_start] - $row[time_end] $row[location]";
			$returnValue .= "<div id='$id' class='panel-heading'>";
			$returnValue .= self::getHeader ( $id, $id_date );
			$returnValue .= "</div>";
			$returnValue .= "<div class='panel-body'>";
			$returnValue .= self::getSubscribed ( $id );
			$returnValue .= self::getUnsubscribed ( $id );
			if ($_SESSION ["user"] ["admin"] == 1) {
				$returnValue .= self::getNotsubscribed ( $id );
			}
			$returnValue .= "</div>";
			$returnValue .= "</div>";
		}
// 		$returnValue .= "</div>";
		return $returnValue;
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
		self::defaultSignUp ();
	}
	private static function defaultSignUp() {
		$res = DatabaseUtil::executeQuery ( "SELECT * FROM user_defaults" );
		while ( $row = mysql_fetch_array ( $res ) ) {
			$username = $row ["username"];
			$subscribeType = $row ["subscribe_type"];
			$trainingsID = $row ["trainingsID"];
			$resTraining = self::selectTrainings($username);
			while ( $tmp = mysql_fetch_array ( $resTraining ) ) {
				$tid = $tmp ["id"];
				$resSubscribed = DatabaseUtil::executeQuery ( "SELECT * FROM subscribed_for_training WHERE trainingsID = '$tid' AND username='$username';" );
				if (mysql_num_rows ( $resSubscribed ) == 0) {
					DatabaseUtil::executeQuery ( "INSERT INTO subscribed_for_training (username, subscribe_type, trainingsID) VALUES ('$username', '$subscribeType', '$tid');" );
				}
			}
		}
	}
	public static function removeTraining($trainingsID) {
		$res = DatabaseUtil::executeQuery ( "UPDATE training SET deleted='1' WHERE id='$trainingsID'" );
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
		var_dump ( $_SESSION );
		Training::subscribeForTraining ( $_SESSION ["user"] ["username"], $subscribeType, $trainingsID );
		break;
	case "getSideNavbar":
		echo Training::getSideNavbar();
		break;
	case "getTraining" :
		Training::createNextTrainings (); // TODO outsource into a periodic function.
		echo Training::getTraining ();
		break;
	case "removeTraining" :
		$trainingsID = $_POST ["id"];
		Training::removeTraining ( $trainingsID );
		break;
}

?>
