<?php

/**
 * Starts the Session if not already running.
 */
if(!isset($_SESSION)){
	session_start();
}


class ConnectionInformation{
	private $username = "";
	private $password = "";
	private $hostname = "";
	private $port = "";
	private $db = "";


	public function __construct(){
		$config = parse_ini_file('../config.ini');
		$filename = $config['main_config_path'] . '/database.ini';
		$data = parse_ini_file($filename);
		$this->username = $data['username'];
		$this->password = $data['password'];
		$this->hostname = $data['hostname'];
		$this->port = $data['port'];
		$this->db = $data['db'];
	}

	public function getUsername(){
		return $this->username;
	}

	public function getPassword(){
		return $this->password;
	}

	public function getHostname(){
		return $this->hostname;
	}

	public function getPort(){
		return $this->port;
	}

	public function getDB(){
		return $this->db;
	}

}

/**
 * This utility class holds the function which are used to interact with the database on the server.
 */
class DatabaseUtil{ 
	
	
	/**
	 * Sets up the information needed to connect with the database. Try to establish a connection with the database.
	 * @returns Resource the link to the database.
	 */
	private static function connectToDatabase(){
			$con = new ConnectionInformation();
			$link = mysql_connect($con->getHostname(), $con->getUsername(), $con->getPassword()) or die("Keine Verbindung möglich: " .  mysql_error());
			$datenbank = mysql_select_db($con->getDB(), $link);
			if(!$datenbank){
				echo "Kann nicht zur Datenbank verbinden.";
			}
			return $link;
	}
	
	/**
	 * Opens a link to the database. Executes the query handed to this function. Closes the link to the database and returns the result of the query as resource.
	 * @param String $sql the query which will be executed.
	 * @returns Resource the result of the query as mysql resource.
	 */
	public static function executeQuery($sql){
		$link = self::connectToDatabase();
		$res = mysql_query($sql, $link) or die(mysql_error());
		mysql_close($link);
		return $res;
	}
	
	/**
	 * TODO: if the result contains only one row, return an single object instead of an array of this object. 
	 * Opens a link to the database. Executes the query handed to this function. Closes the link to the database and returns the result of the query as a JSON array.
	 * @param String $sql the query which will be executed.
	 * @returns Resource the result of the query as a json array.
	 */
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


	/**
	 * Opens a link to the database. Executes the query handed to this function. Closes the link to the database and returns the result of the query as a PHP array.
	 * @param String $sql the query which will be executed.
	 * @returns Resource the result of the query as a PHP array.
	 */
	public static function executeQueryAsArray($sql){
		$link = self::connectToDatabase();
		$res = mysql_query($sql, $link) or die(mysql_error());
		mysql_close($link);
		$returnArray = array();
		while($row = mysql_fetch_array($res)){
			$returnArray[] = $row;
		}
		return $returnArray;
	}
	
	/**
	 * Opens a link to the database. Executes the query handed to this function. Closes the link to the database and returns the result of the query as a PHP array with assoc index only.
	 * @param String $sql the query which will be executed.
	 * @returns Resource the result of the query as a PHP array with assoc index only.
	 */
	public static function executeQueryAsArrayAssoc($sql){
		$link = self::connectToDatabase();
		$res = mysql_query($sql, $link) or die(mysql_error());
		mysql_close($link);
		$returnArray = array();
		while($row = mysql_fetch_assoc($res)){
			$returnArray[] = $row;
		}
		return $returnArray;
	}

	/**
	 * @deprecated
	 * starts a php-session, if the session is not allready started. Is included in init.php now.
	 */
	public static function startSession(){
		if(!isset($_SESSION)) {
			session_start();
		}
	}
	
	
	/**
	 * Gets the address is of the last inserted address.
	 * @returns a String that contains the last inserted id.
	 */
	public static function getLastInsertedAddressID(){
		$res = self::executeQuery("SELECT aid FROM address ORDER BY aid DESC LIMIT 1");
		$row = mysql_fetch_array($res);
		return $row["aid"];
	}

}
?>
