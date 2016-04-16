<?php

class ArrayResponse{

	private $response = array();


	/**
	 * This array holds the data that will be returned to the client to feed a mustache template.
	 */
	private $mustache = array(
		data => array()
	);


	/**
	 * Gets the data from the mustache array, and returns it as a JSON object.
	 */
	public function get_data_for_mustache(){
		return json_encode($this->mustache);
	}


	/**
	 * Appends the $key-$value pair to the array data from mustache.
	 */
	public function add_data_to_mustache($key, $value){
		$this->mustache["data"][$key] = $value;
	}

}


?>
