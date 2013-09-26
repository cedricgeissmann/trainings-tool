<?php




class DatabaseUtil{ 
	
	private static function getEnv(){
		$services_json = json_decode(getenv("VCAP_SERVICES"),true);
		return $services_json["mysql-5.1"][0]["credentials"];
	}
	
	private static function alternativeConnection(){
		$link = mysql_connect("localhost", "tvmuttenz", "Wiederkäuer2");
	}
	
	private static function connectToDatabase(){
		$mysql_config = self::getEnv();
		$username = $mysql_config["username"];
		if(!isset($username)){
			$username = "tvmuttenz";
		}
		$password = $mysql_config["password"];
		if(!isset($password)){
			$password = "Wiederkäuer2";
		}
		$hostname = $mysql_config["hostname"];
		if(!isset($hostname)){
			$hostname = "localhost";
		}
		$port = $mysql_config["port"];
		if(!isset($port)){
			$port = "3306";
		}
		$db = $mysql_config["name"];
		if(!isset($db)){
			$db = "tvmuttenz";
		}
		$link = mysql_connect($hostname, $username, $password) or die("Keine Verbindung möglich: " .  mysql_error());
		$datenbank = mysql_select_db($db, $link);
		if(!$datenbank){
			echo "Kann nicht zur Datenbank verbinden.";
		}
		return $link;
	}
	
	
	public static function executeQuery($sql){
		$link = self::connectToDatabase();
		$res = mysql_query($sql, $link) or die(mysql_error());
		mysql_close($link);
		return $res;
	}
	
	public static function executeQueryAsJSON($sql){
		$link = self::connectToDatabase();
		$res = mysql_query($sql, $link) or die(mysql_error());
		mysql_close($link);
		$returnArray = array();
		while($row = mysql_fetch_assoc($res)){
			$returnArray[] = $row;
		}
		return json_encode($returnArray);
	}

	public static function startSession(){
		if(!isset($_SESSION)) {
			session_start();
		}
	}
	
	public static function getLastInsertedAddressID(){
		$res = self::executeQuery("SELECT aid FROM address ORDER BY aid DESC LIMIT 1");
		$row = mysql_fetch_array($res);
		return $row["aid"];
	}

}


/**
 * Evaluate incoming requests.
 */
 $function = $_POST["func"];
 switch($function){
 	case "getJSONFromQuery":
 		$query = $_POST["query"];
 		echo DatabaseUtil::subscribeForTraining($query);
 		break;
 }

?>
