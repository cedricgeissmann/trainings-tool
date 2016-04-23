<?php

require_once __DIR__ . "/../init.php";


class Router{

	private $must_have_annotation = "router_may_call";

	private function verify_class($class_name){
		return Util::check_for_annotation_class($class_name, $this->must_have_annotation);
	}


	private function verify_function($class_name, $function_name){
		return Util::check_for_annotation_function($class_name, $function_name, $this->must_have_annotation);
	}


	public function call_serverside_function($class_name, $function_name, $args = array()) {
		if( $this->verify_class($class_name) AND $this->verify_function($class_name, $function_name) ){
			$obj = new $class_name();
			return $obj->$function_name($args);
		}
		return FALSE;
	}
}


?>
