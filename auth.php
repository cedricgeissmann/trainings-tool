<?php
if(!isset($_SESSION)){
	session_start();
}

include 'server/DatabaseUtil.php';

class Auth{

	public static function checkIfLoggedIn(){
		if(isset($_COOKIE['logged_in'])){
			$hash = $_COOKIE['logged_in'];
			self::check_if_hash_is_valid($hash);
		}else{
			$hash = sha1(join('', array(time(), rand())));
			setcookie('logged_in', $hash);
			self::write_hash_to_database($hash);
		}
	}


	public static function check_if_hash_is_valid($hash){
		$res = DatabaseUtil::executeQueryAsArrayAssoc("SELECT * FROM logged_in");
		var_dump($res);
	}

	public static function write_hash_to_database($hash){
		DatabaseUtil::executeQuery("INSERT INTO logged_in (username, hash) VALUES ('cedy', '$hash')");
		echo "written";
	}

}

Auth::checkIfLoggedIn();
Auth::write_hash_to_database("lalala\n");
?>
