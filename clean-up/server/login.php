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

	echo "{\"exists\": true, \"active\": true}";
	
		
/*        if (mysql_num_rows($res) > 0){
			if($array["activate"]==1){
				$_SESSION["login"] = 1;
				$_SESSION["user"] = $array;
				DatabaseUtil::executeQuery("UPDATE user SET last=NOW()
                     WHERE username='$_SESSION[user][username]'");
			}else{
				echo "Sie wurden noch nicht freigeschalten.";
				exit;
			}
		}else{
			$res = DatabaseUtil::executeQuery("SELECT * FROM user WHERE
											username='$_username'");
			if(mysql_num_rows($res) > 0){
				echo "Falsches Passwort.";	//TODO Error Dialog.
				exit;
			}
			
            include("login-formular.html");
            exit;
        }
	
    if ($_SESSION["login"] == 0 && isset($_SESSION["login"])){
        exit;
    }    
    
    $URL="main.php";
	header ("Location: $URL"); 
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
	 * Checks if a user exists.
	 */
    function checkUserExists(&$res){
    	if(mysql_num_rows($res) > 0){
    		return true;
    	}else{
			exit("{\"exists\": false, \"active\": false}");
    	}
    }
    
?>