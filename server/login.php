<?php
    include 'DatabaseUtil.php';
    DatabaseUtil::startSession();
    
    include_once "LoggerUtil.php";

	$logger = new LoggerUtil();
	
    $username = $_POST["username"];
    $password = md5($_POST["password"]);	
	
	/**
	 * Selecting the user with his privileges from the role table.
	 */
    $res = DatabaseUtil::executeQuery("SELECT * FROM user INNER JOIN role ON (user.username = role.username) WHERE
                    user.username='$username' AND
                    user.password='$password'");
					
	$array = array();  
	checkUserExists($res);
	checkUserIsActive($res, $array);

	$_SESSION["user"] = $array;
	$_SESSION["login"] = 1;
	DatabaseUtil::executeQuery("UPDATE user SET last=NOW() WHERE username='$username'");
	echo "{\"exists\": 1, \"active\": 1}";
	
	$logger->writeLog($username, "Successfully logged in");
	
	
	/**
	 * Checks if an user is set active.
	 * Returns true when the user is active.
	 * Exits the script and notifies the client that the user exists but is not activated.
	 */
	function checkUserIsActive(&$res, &$array){
		$logger = new LoggerUtil();
		$array = mysql_fetch_assoc($res);
		if($array["activate"]==1){
			return true;
		}else{
			$logger->writeLog($username, "User tries to log in but failed because he is not activated");
			exit("{\"exists\": 1, \"active\": 0}");
		}
	}
    
	/**
	 * Checks if an user exists.
	 * Returns true when the user is active.
	 * Exits the script and notifies the client that the user does not exist.
	 */
    function checkUserExists(&$res){
    	$logger = new LoggerUtil();
		if(mysql_num_rows($res) > 0){
    		return true;
    	}else{
    		//$logger->writeLog($username, "User tries to log in but failed because he does not exist or wrong password");
			exit("{\"exists\": 0, \"active\": 0}");
    	}
    }
    
?>