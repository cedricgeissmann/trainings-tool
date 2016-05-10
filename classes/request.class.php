<?php

class RequestException extends Exception{

}


class Request{


	public function __construct(){
		if( !empty($_POST) ){
			if( isset($_POST["class_name"]) ){
				$this->class_name = $_POST["class_name"];
			}else{
				throw new RequestException("No Class is specified");
			}
			if( isset($_POST["function_name"]) ){
				$this->function_name = $_POST["function_name"];
			}else{
				throw new RequestException("No function is specified");
			}
			if( isset($_POST["args"]) ){
				$this->args = json_decode($_POST["args"], true);
			}else{
				$this->args = array();
			}
		}else{
			throw new RequestException("No POST data available");
		}
	}


	public function get_class_name(){
		return $this->class_name;
	}

	public function get_function_name(){
		return $this->function_name;
	}


	public function get_args(){
		return $this->args;
	}
}

?>
