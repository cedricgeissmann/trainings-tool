<?php

class DBConnection{

	private $link = 0;


	/**
	 * DBConnection has to be called by constructor to establish the link to the database.
	 *
	 * If the current connection to the database is no longer used. The destructor function will be called to close the database connection.
	 */
	public function __construct(){
		$this->open_connection_to_database();
	}


	public function __destruct(){
		$this->close_connection_to_database();
	}


	/**
	 * Sets up the information needed to connect with the database. Try to establish a connection with the database.
	 * @returns Resource the link to the database.
	 */
	private function open_connection_to_database(){
			$con = new ConnectionInformation();
			$this->link = mysqli_connect($con->get_hostname(), $con->get_username(), $con->get_password(), $con->get_db());
	}


	private function close_connection_to_database(){
		mysqli_close($this->link);
	}


	/**
	 * Query the database with the $sql statement.
	 *
	 * Return an object that contains all the informations from the query.
	 */
	public function select($sql){
		$response = array(
			number_of_rows => 0,
			response => array(),
		);


		$res = mysqli_query($this->link, $sql);

		$num = mysqli_num_rows($res);

		$response["number_of_rows"] = $num;
		if($num == 1){
			$response["response"] = mysqli_fetch_assoc($res);
		}elseif($num > 1){
			while($row = mysqli_fetch_assoc($res)){
				$response["response"][] = $row;
			}
		}

		return $response;

	}

	/**
	 * Executes the following $sql statement. When rows are affected, return true. If nothing changes return false.
	 */
	public function delete($sql){
		$res = mysqli_query($this->link, $sql);

		return $this->query_has_effect_on_db();
	}

	/**
	 * Executes the following $sql statement. When rows are affected, return true. If nothing changes return false.
	 */
	public function update($sql){
		$res = mysqli_query($this->link, $sql);

		return $this->query_has_effect_on_db();
	}


	/**
	 * Executes the following $sql statement. When rows are affected, return true. If nothing changes return false.
	 */
	public function insert($sql){
		$res = mysqli_query($this->link, $sql);

		return $this->query_has_effect_on_db();
	}


	/**
	 * Executes the following $sql statement. When rows are affected, return true. If nothing changes return false.
	 */
	public function exists($sql){
		$res = mysqli_query($this->link, $sql);

		return $this->query_has_effect_on_db();
	}


	private function query_has_effect_on_db(){
		$affected_rows = mysqli_affected_rows($this->link);
		if($affected_rows > 0){
			// something was inserted.
			return TRUE;
		}
		// There has nothing changed in the database.
		return FALSE;
	}

}

?>
