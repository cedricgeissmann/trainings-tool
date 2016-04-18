<?php

class ArrayResponse{

	private $response = array();

	/**
	 * Gets the data from the response array.
	 */
	public function get_data(){
		return $this->response;
	}


	/**
	 * Appends the $key-$value pair to the response array.
	 */
	public function add_data($key, $value){
		$this->response[$key] = $value;
	}

}


?>
