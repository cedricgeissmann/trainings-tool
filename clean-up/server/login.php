<?php
    include 'DatabaseUtil.php';
    DatabaseUtil::startSession();
	
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
	echo "{\"exists\": true, \"active\": true}";
	
	
	/**
	 * Checks if an user is set active.
	 * Returns true when the user is active.
	 * Exits the script and notifies the client that the user exists but is not activated.
	 */
	function checkUserIsActive(&$res, &$array){
		$array = mysql_fetch_assoc($res);
		if($array["activate"]==1){
			return true;
		}else{
			exit("{\"exists\": true, \"active\": false}");
		}
	}
    
	/**
	 * Checks if an user exists.
	 * Returns true when the user is active.
	 * Exits the script and notifies the client that the user does not exist.
	 */
    function checkUserExists(&$res){
    	if(mysql_num_rows($res) > 0){
    		return true;
    	}else{
			exit("{\"exists\": false, \"active\": false}");
    	}
    }
    
?>