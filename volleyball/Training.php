<?php
include 'DatabaseUtil.php';

class Training{

	private static function getSideNavbar($type){
		$sideNavbar = "<div class='well sidebar-nav span3'>
				<ul id='trainingsNavbar' class='nav nav-list'>
				<li class='nav-header'>Trainings</li>";		//TODO insert type
		$res = DatabaseUtil::executeQuery("SELECT * FROM `training` WHERE type='$type' AND date>='".date("Y-m-d")."' ORDER BY date ASC");
		$sideNavbar .= self::addTrainingsNavbarEntry($res);
		$sideNavbar .= "</ul></div>";
		return $sideNavbar;
	}


	private static function getHeader($id, $id_date){
		$header = "<div class='row-fluid'>";
		$header .= "<h4 name='$id' class='span'>$id_date";
		if($_SESSION["user"]["admin"]==1){
			$header .= "<div class='span2 pull-right'>";
			$header .= "<button class='btn' onclick='removeTraining(this)' name='$id'>Entfernen</button>";
			$header .= "</div>";
		}
		$header .= "</h4>";
		$header .= "</div>";
		return $header;
	}
	
	private static function getNotSubscribed($id){
		$htmlString = "<div class='span6'>
				<div class='container-fluid'>
				<div class='span'>
				<h3>Nicht gemeldet</h3>
				</div>
				<div class='container-fluid'>".
					self::getNotSubscribedPersons($id)
					."</div>
					</div>
					</div>";
		return $htmlString;
	}

	private static function getSubscribed($id){
		$htmlString = "<div class='span6'>
				<div class='container-fluid'>
				<div class='span'>
				<h3>Angemeldet</h3>
				</div>
				<div class='container-fluid'>".
				self::getSubscribedPersons($id, 1)
				."<button name='$id' class='btn' onclick='subscribe(this)'>Anmelden</button>
				</div>
				</div>
				</div>";
		return $htmlString;
	}

	private static function getUnsubscribed($id){
		$htmlString = "<div class='span6'>
				<div class='container-fluid'>
				<div class='span'>
				<h3>Abgemeldet</h3>
				</div>
				<div class='container-fluid'>".
				self::getSubscribedPersons($id, 0)
				."<button name='$id' class='btn' onclick='unsubscribe(this)'>Abmelden</button>
				</div>
				</div>
				</div>";
		return $htmlString;
	}
	
	private static function createAdminButton($user, $trainingsID){
		$adminButton = "<div class='btn-group'>";
		$adminButton .= "<button class='btn dropdown-toggle' data-toggle='dropdown'><span class='caret'></span></button>";
		$args = "'$user[username]', '$trainingsID'";
		//TODO make switches: <li><div class='make-switch'><input type='checkbox' checked /></div></li>
		$adminButton .= "<ul class='dropdown-menu'>
                  <li><a href='#' onclick=\"subscribeFromAdmin($args)\">Spieler anmelden</a></li>
                  <li><a href='#' onclick=\"unsubscribeFromAdmin($args)\">Spieler abmelden</a></li>
                  <li><a href='#' onclick=\"removeFromTrainingFromAdmin($args)\">Spieler entfernen</a></li>
                  <li class='divider'></li>
                  <li><a href='#' onclick=\"activate('$user[username]', '1')\">Freischalten</a></li>
                  <li><a href='#' onclick=\"activate('$user[username]', '0')\">Sperren</a></li>
                  <li><a href='#' onclick=\"changeTrainer('$user[username]', '1')\">Trainerrechte gewähren</a></li>
                  <li><a href='#' onclick=\"changeTrainer('$user[username]', '0')\">Trainerrechte verwerfen</a></li>
                  <li><a href='#' onclick=\"changeAdmin('$user[username]', '1')\">Adminrechte gewähren</a></li>
                  <li><a href='#' onclick=\"changeAdmin('$user[username]', '0')\">Adminrechte verwerfen</a></li>
                  <li class='divider'></li>
                  <li><a data-toggle='modal' href='#modal$user[username]'>Passwort zurücksetzen</a></li>
                  <li><a href='#' onclick=\"deleteUser('$user[username]')\">Benutzer löschen</a></li>
                </ul>";
		$adminButton .= "</div>";
		return $adminButton;
	}

	private static function getNotSubscribedPersons($trainingsID){
		$resUsernames = DatabaseUtil::executeQuery("SELECT username, activate FROM  `user` AS a WHERE NOT EXISTS (SELECT username FROM subscribed_for_training AS b WHERE trainingsID =  '$trainingsID' AND a.username = b.username) AND a.activate='1'");
		$notSubscribedList = "";
		while($row = mysql_fetch_array($resUsernames)){
 			$res = DatabaseUtil::executeQuery("SELECT DISTINCT username FROM user WHERE activate='1'");
 			
			$res = DatabaseUtil::executeQuery("SELECT * FROM `user`
					WHERE username = '$row[username]'");
	
			while($user = mysql_fetch_array($res)){
				$subscribedList .= "<div class='row'>";
				$subscribedList .= "<p class='personInTraining span6'>$user[firstname] $user[name]</p>";
				if($_SESSION["user"]["admin"]){
					$subscribedList .= self::createAdminButton($user, $trainingsID);
				}
				$subscribedList .= "</div>";
			}
		}
		return $subscribedList;
	}
	
	private static function getSubscribedPersons($trainingsID, $subscribed){
		$resUsernames = DatabaseUtil::executeQuery("SELECT DISTINCT username FROM `subscribed_for_training`
				WHERE trainingsID = '$trainingsID' AND subscribe_type='$subscribed'");
		$subscribedList = "";
		while($row = mysql_fetch_array($resUsernames)){
			$res = DatabaseUtil::executeQuery("SELECT * FROM `user`
					WHERE username = '$row[username]'");
				
			while($user = mysql_fetch_array($res)){
				$subscribedList .= "<div class='row'>";
				$subscribedList .= "<p class='personInTraining span6'>$user[firstname] $user[name]</p>";
				if($_SESSION["user"]["admin"]){
					$subscribedList .= self::createAdminButton($user, $trainingsID);
				}
				$subscribedList .= "</div>";
			}
		}
		return $subscribedList;
	}
	
	private static function addTrainingsNavbarEntry($res){
		$returnValue = "";
		while($row = mysql_fetch_array($res)){
			$id = $row['id'];
			$date = date("l j. F Y",strtotime($row[date]));
			$returnValue .= "<li><a href=#$id>$date</a></li>";
		}
		return $returnValue;
	}

	public static function subscribeForTraining($username, $subscribeType, $trainingsID){
		$allreadySubscribed = DatabaseUtil::executeQuery("SELECT * FROM subscribed_for_training WHERE username = '$username' AND trainingsID = '$trainingsID'");
		if(mysql_num_rows($allreadySubscribed)>0){
			DatabaseUtil::executeQuery("UPDATE subscribed_for_training SET subscribe_type = '$subscribeType' WHERE trainingsID='$trainingsID' AND username='$username'");
		}else{
			DatabaseUtil::executeQuery("INSERT INTO subscribed_for_training (username, subscribe_type, trainingsID) VALUES ('$username', '$subscribeType', '$trainingsID')");
		}
	}

	public static function getTraining($type){
		$returnValue = "<div class='container'>";
		$returnValue .= "<div class='row-fluid'>";
		$returnValue .= self::getSideNavbar($type);
		$returnValue .= "<div class='span8'>";
		$res = DatabaseUtil::executeQuery("SELECT * FROM `training` WHERE type='$type' AND date>='".date("Y-m-d")."' ORDER BY date ASC");
		while($row = mysql_fetch_array($res)){
			$id = $row['id'];
			$date = date("l j. F Y",strtotime($row[date]));
			$id_date = "$date $row[time_start] - $row[time_end] $row[location]";
			$returnValue .= "<article id='$id' class='container-fluid well'>";
			$returnValue .= self::getHeader($id, $id_date);
			$returnValue .= "<div class='row-fluid'>";
			$returnValue .= self::getSubscribed($id);
			$returnValue .= self::getUnsubscribed($id);
			if($_SESSION["user"]["admin"]==1){
				$returnValue .= self::getNotsubscribed($id);
			}
			$returnValue .= "</div>";
			$returnValue .= "</article>";
		}
		$returnValue .= "</div></div></div>";
		return $returnValue;
	}

	public static function getNextTraining($type){
		$returnValue = "";
		$res = DatabaseUtil::executeQuery("SELECT * FROM `training` WHERE type='$type' AND date>='".date("Y-m-d")."' ORDER BY date ASC");
		$row = mysql_fetch_array($res);
		$id = $row['id'];
		$date = date("l j. F Y",strtotime($row[date]));
		$id_date = "$date $row[time_start] - $row[time_end] $row[location]";
		return $id_date;
	}

	public static function createNextTrainings(){
		$nextWeeks=2;	//Wieviele Wochen im voraus ein training erzeugt werden soll.
		$res = DatabaseUtil::executeQuery("SELECT * FROM default_training");
		while($row = mysql_fetch_array($res)){
			for($k=0;$k<7*$nextWeeks;$k++){
				$date = mktime(0, 0, 0, date("m")  , date("d")+$k, date("Y"));
				if($row['day']==date("l", $date)){
					$time = date("Y-m-d",$date);
					$res2 = DatabaseUtil::executeQuery("SELECT * FROM `training` WHERE location='$row[location]' AND time_start='$row[timeStart]' AND date='$time' AND type='$row[type]'");
					$res3 = DatabaseUtil::executeQuery("SELECT * FROM `drop_out` WHERE location='$row[location]' AND time_start='$row[timeStart]' AND date='$time' AND type='$row[type]'");
					if(mysql_num_rows($res2)<1 && mysql_num_rows($res3)<1){
						DatabaseUtil::executeQuery("INSERT INTO `training` (location, time_start, time_end, date, day, type, trainingsID) VALUES ('$row[location]', '$row[timeStart]', '$row[timeEnd]', '$time', '$row[day]', '$row[type]','$row[id]')");
					}
				}
			}
		}
		self::defaultSignUp();
	}

	private static function defaultSignUp(){
		$res = DatabaseUtil::executeQuery("SELECT * FROM user_defaults");
		while($row = mysql_fetch_array($res)){
			$username = $row["username"];
			$subscribeType = $row["subscribe_type"];
			$trainingsID = $row["trainingsID"];
			$resTraining = DatabaseUtil::executeQuery("SELECT * FROM `training` WHERE type='training' AND date>='".date("Y-m-d")."' AND trainingsID='$trainingsID' ORDER BY date ASC");
			while($tmp = mysql_fetch_array($resTraining)){
				$tid = $tmp["id"];
				$resSubscribed = DatabaseUtil::executeQuery("SELECT * FROM subscribed_for_training WHERE trainingsID = '$tid' AND username='$username';");
				if(mysql_num_rows($resSubscribed)==0){
					DatabaseUtil::executeQuery("INSERT INTO subscribed_for_training (username, subscribe_type, trainingsID) VALUES ('$username', '$subscribeType', '$tid');");
				}
			}
		}
	}
	
	public static function removeTraining($trainingsID, $type){
		$res = DatabaseUtil::executeQuery("SELECT * FROM `training` WHERE id='$trainingsID'");
		while($row = mysql_fetch_array($res)){
			DatabaseUtil::executeQuery("INSERT INTO `drop_out` (id, date, time_start, time_end, location, type) VALUES ('$row[id]', '$row[date]', '$row[time_start]', '$row[time_end]', '$row[location]', '$row[type]')");
			DatabaseUtil::executeQuery("DELETE FROM `training` WHERE id='$trainingsID'");
		}
	}
}





/**
 * Evaluate incoming requests.
 */
$function = $_POST["function"];
switch($function){
	case "subscribeForTraining":
		$trainingsID = $_POST["trainingsID"];
		$subscribeType = $_POST["subscribeType"];
		Training::subscribeForTraining($_SESSION["user"]["username"], $subscribeType, $trainingsID);
		break;
	case "getTraining":
		Training::createNextTrainings();
		echo Training::getTraining($_POST["type"]);
		break;
	case "removeTraining":
		$trainingsID = $_POST["id"];
		$type = $POST["type"];
		Training::removeTraining($trainingsID, $type);
		break;
}

?>
