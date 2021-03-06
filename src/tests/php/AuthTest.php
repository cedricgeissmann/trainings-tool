<?php

require_once __DIR__ . "/../../server/autoloader.php";



class AuthTest extends PHPUnit_Framework_Testcase{

	/**
	 * @test
	 * Use the testuser to check if login is successfull.
	 * After the login the $_SESSION has to be set according to this test.
	 */
	public function testLogin(){
		$auth = new Auth();
		$args = array(
			"username" => "test",
			"password" => "1234"
		);
		$auth->login($args);
		



		$this->assertTrue(isset($_SESSION["auth"]));
		$this->assertTrue($_SESSION["auth"]);



		$this->assertTrue(isset($_SESSION["user"]));
		$this->assertTrue(isset($_SESSION["user"]["username"]));
		$this->assertEquals($_SESSION["user"]["username"], "test");
	}





	/**
	 * @test
	 * @depends testLogin
	 */
	/* public function testLogout(){ */
	/* 	$auth = Auth::logout(); */

	/* 	$this->assertFalse(isset($_SESSION["auth"])); */
	/* 	$this->assertFalse(isset($_SESSION["user"])); */
	/* } */


}
