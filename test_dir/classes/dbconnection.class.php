<?php


class DBConnection{


	public function __construct(){

	}


	/**
	 * Query the database with the $sql statement.
	 *
	 * Return an object that contains all the informations from the query.
	 */
	public function select($sql){
		//TODO: implement
		$response = array(
			number_of_rows => 0,
			response => array(),
			keys => array()
		);
	}

}

?>
