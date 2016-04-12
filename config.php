<?php

class Config{


	/*
	 * Change these variables here to change the config. When a new entry is needed, create one as private static and create a getter function.
	 */
	private static $main_config_path = "configs/"; 
	private static $main_log_path = "logs/"; 

	public static function get_main_config_path(){
			return $_SERVER['DOCUMENT_ROOT'] . Config::$main_config_path;
	}

	public static function get_main_log_path(){
			return $_SERVER['DOCUMENT_ROOT'] . Config::$main_log_path;
	}

}

?>
