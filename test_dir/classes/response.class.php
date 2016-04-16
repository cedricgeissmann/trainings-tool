<?php

class Response{

	private $response_string = "";


	public function __construct(){

	}


	public function append($str){
		$response_string .= $str;
	}

	public function append_nl($str){
		$response_string .= $str ."\n";
	}

	public function append_br($str){
		$response_string .= $str ."<br>";
	}


	public function toString(){
		return $response_string;
	}
}


?>
