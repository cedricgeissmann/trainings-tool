<?php

require_once __DIR__ . "/../init.php";



class RequestTest extends PHPUnit_Framework_Testcase{

	/**
	 * @expectedException RequestException
	 */
	public function testWithNoPostData(){
		$req = new Request();
	}

	/**
	 * @expectedException RequestException
	 */
	public function testWithNoClass(){
		$_POST["function"] = "getTraining";
		$req = new Request();
	}

	/**
	 * @expectedException RequestException
	 */
	public function testWithNoFunction(){
		$_POST["class"] = "TrainingUtil";
		$req = new Request();
	}

	/**
	 */
	public function testWithEmptyArgs(){
		$_POST["class"] = "TrainingUtil";
		$_POST["function"] = "getTraining";
		$req = new Request();

		$this->assertEquals($req->get_class_name(), "TrainingUtil");
		$this->assertEquals($req->get_function_name(), "getTraining");
		$this->assertTrue(empty($req->get_args()));
	}

	/**
	 */
	public function testWithPostSet(){
		$_POST["class"] = "TrainingUtil";
		$_POST["function"] = "getTraining";
		$var = array(
			"test1" => 1,
			"foo" => "bar"
		);
		$_POST["args"] = $var;



		$req = new Request();

		$this->assertEquals($req->get_class_name(), "TrainingUtil");
		$this->assertEquals($req->get_function_name(), "getTraining");
		$this->assertFalse(empty($req->get_args()));
		$this->assertEquals($req->get_args(), $var);
	}


}
