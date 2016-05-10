<?php

/**
 * This class will be used to authenticate the user.
 *
 *
 * The user may stay in the autheticated area if:
 *	1: he has a session that says auth is okay
 *	2: he has a matching cookie 
 *
 *
 *	@router_may_call
 */
class Auth{

	private $hash = "";
	private $hash_cookie_name = "logged_in";
	private $hash_cookie_expiration_time = 0;


	public function __construct(){
		$this->hash_cookie_expiration_time = strtotime("+30 days");
		$this->db = new DBConnection();
	}


	public function construct_default(){
		$this->needs_login();
	}

	private function abort($str){
		$res = new ArrayResponse();
		$res->add_data("error", $str);
		echo $res->output_response();
		exit;
	}

	/**
	 * @router_may_call
	 */
	public function needs_login(){

		if( isset($_SESSION["auth"]) and $_SESSION["auth"] === TRUE){
			// The user is authenticated.
			// Nothing more has to be done.
			return "user session still active";
		}else{
			// The user is not currently authenticated. Check if he has a cookie. If he has, autologgin the user, else redirect the user to authentication screen.
			if( $this->load_hash_from_cookie() ){
				//Cookie was set. Continue with normal execution.
				if( $this->check_if_hash_is_valid() ){
					//The hash is valid and exists in the database.
					//
					//Reload the users session.
					$this->reload_user_session();
					return "User session restored";
				}else{
					// The hash is invalid or has expired. 
					//
					// No need to reload the users session.
					//header("location: /index.php");
					//
					$this->abort("This session cookie is no longer valid.");
				}
			}else{
				//Cookie was not set or expired. There is no session to reload.
				//header("location: /index.php");
				//
				$this->abort("Cannot recreate session. Cookie is expired or does not exist.");
			}

			// The user has either successfully reloaded its session or logged in with an expired cookie.
			//
			// Either way. Create a new hash for the user, store the hash as cookie, and update the session entry in the database.
			//
			// Only do this on logout.
			$this->create_hash();
			$this->write_cookie();
			$this->store_session_in_db();
		}

	}



	/**
	 * @router_may_call
	 */
	/* public function login($args){ */
	/* 	echo "Till here"; */
	/* 	exit; */
	/* 	return $this->login($args["username"], $args["password"]); */
	/* } */




	/**
	 * @router_may_call
	 */
	public function login($args){
		$username = $args["username"];
		$password = md5($args["password"]);
		if($this->db->exists("SELECT * FROM user WHERE username='$username' AND password='$password'")){
			$_SESSION["auth"] = TRUE;
			$_SESSION["user"]["username"] = $username;

			$this->create_hash();
			$this->write_cookie();
			$this->store_session_in_db();
			
			return "Login was successfull";
		}else{

			return "Failed to log in with $username and $password";
			//header("location: /index.php");
		}

	}


	/**
	 * This will logout the user, destroy his session and delete the cookie as well as remove his auth from the database.
	 *
	 * @router_may_call
	 */
	public function logout(){
		$this->destroy_cookie();
		$this->destroy_db_entry();
		$this->destroy_session();
		return "Successfully logged out.";
	}

	private function destroy_session(){
		// Unset all of the session variables.
		$_SESSION = array();

		// If it's desired to kill the session, also delete the session cookie.
		// Note: This will destroy the session, and not just the session data!
		if (ini_get("session.use_cookies")) {
			$params = session_get_cookie_params();
			$cookie = new CookieSetter();
			$cookie->setcookie(session_name(), '', time() - 42000);
		}

	}

	private function destroy_cookie(){
		$exp_time = strtotime("-30 days");
		$cookie = new CookieSetter();
		$cookie->setcookie($this->hash_cookie_name, "", $exp_time);
	}


	private function destroy_db_entry(){
		$username = $_SESSION["user"]["username"];
		$this->db->delete("DELETE FROM auth WHERE username='$username'");
	}


	/**
	 * Loads the hash from the cookie.
	 */
	private function load_hash_from_cookie(){
		if(isset($_COOKIE[$this->hash_cookie_name])){
			$this->hash = $_COOKIE[$this->hash_cookie_name];
			return TRUE;
		}
		return FALSE;
	}


	/**
	 * Creates a hash that can be stored as cookie and in the database, to reload the users session.
	 */
	private function create_hash(){
		$this->hash = sha1(join('', array(time(), rand())));
	}


	/**
	 * Creates a cookie at the user that contains the hash. This cookie will be used to reload the users session.
	 */
	public function write_cookie(){
		$cookie = new CookieSetter();
		$cookie->setcookie($this->hash_cookie_name, $this->hash, $this->hash_cookie_expiration_time);
	}

	/**
	 * Stores the user session in the database.
	 */
	public function store_session_in_db(){
		$username = $_SESSION["user"]["username"];

		if( $this->db->exists("SELECT username FROM auth WHERE username='$username'") ){
			$this->db->update("UPDATE auth SET hash='$this->hash'");
		}
		return $this->db->insert("INSERT INTO auth (username, hash) VALUES ('$username', '$this->hash')");
	}


	/**
	 * Check if the hash value exits in the database.
	 */
	private function check_if_hash_is_valid(){
		//TODO: implement this function.
		//
		return $this->db->exists("SELECT hash FROM auth WHERE hash='$this->hash'");
	}

	/**
	 * Reloads the session for the user.
	 */
	private function reload_user_session(){
		$res = $this->db->select("SELECT username FROM auth WHERE hash='$this->hash'");
		$_SESSION["auth"] = TRUE;
		$_SESSION["user"] = $res["response"];
	}

}

?>
