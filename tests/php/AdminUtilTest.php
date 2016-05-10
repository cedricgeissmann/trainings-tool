<?php

require_once __DIR__ . "/../../server/autoloader.php";


class AdminUtilTest extends PHPUnit_Framework_Testcase{


	protected function setUp(){
		$this->auth = new Auth();
		$args = array(
			"username" => "cedy",
			"password" => "ced-jes"
		);
		$this->auth->login($args);
		$this->admin = new AdminUtil();
	}


	protected function tearDown(){
		$this->auth->logout();
	}



	/**
	 * @test
	 */
	public function testUnsubscribeFromAdmin(){
		$args = array(
			"username" => "cedy",
			"trainingsID" => 902,
			"subscribeType" => 0
		);
		$result = $this->admin->subscribeForTrainingFromAdmin($args);
	}

	/**
	 * @test
	 */
	public function testRemovePersonFromTrainingFromAdmin(){
		$args = array(
			"username" => "cedy",
			"trainingsID" => 902,
		);
		$result = $this->admin->removeFromTrainingFromAdmin($args);
	}
	
}
