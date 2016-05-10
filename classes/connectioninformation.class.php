<?php

//include $_SERVER['DOCUMENT_ROOT'] . 'config.php';
//include Config::get_main_config_path() . 'database.php';

class ConnectionInformation{
	private $username = "tvmuttenz";
	private $password = "Wiederkauer2";
	private $hostname = "localhost";
	private $port = "3306";
	private $db = "tvmuttenz";


	public function __construct(){
	//	global $database_config;
	//	$this->username = $database_config['username'];
	//	$this->password = $database_config['password'];
	//	$this->hostname = $database_config['hostname'];
	//	$this->port = $database_config['port'];
	//	$this->db = $database_config['db'];
	}

	public function get_username(){
		return $this->username;
	}

	public function get_password(){
		return $this->password;
	}

	public function get_hostname(){
		return $this->hostname;
	}

	public function get_port(){
		return $this->port;
	}

	public function get_db(){
		return $this->db;
	}

}

?>
