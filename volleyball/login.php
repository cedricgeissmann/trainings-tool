<?php
    include 'DatabaseUtil.php';
    DatabaseUtil::startSession();
	
    if(!isset($_POST['login'])){
    	echo "Verbindungsfehler!";
	}
	
    $_username = $_POST["username"];
    $_password = md5($_POST["password"]);	
	
    $res = DatabaseUtil::executeQuery("SELECT * FROM user WHERE
                    username='$_username' AND
                    password='$_password'");
		$array = mysql_fetch_array($res);
        if (mysql_num_rows($res) > 0){
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
    
?>
