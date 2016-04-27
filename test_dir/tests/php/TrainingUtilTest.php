<?php

require_once __DIR__ . "/../../init.php";


class TrainingUtilTest extends PHPUnit_Framework_Testcase{


	protected function setUp(){
		$this->auth = new Auth();
		$this->auth->login("test", md5("1234"));
		$this->training = new TrainingUtil();
	}


	protected function tearDown(){
		$auth = new Auth();
		$auth->logout();
	}



	/**
	 * @test
	 * At the moment of writing this test, the user test does not have access to the attendance check.
	 */
	public function testSelectTrainingsWithTrainersAllowedForAttendanceCheck(){
		$result = $this->training->selectTrainingsWithTrainersAllowedForAttendanceCheck();
		$this->assertEquals(count($result), 0);
	}



	public function testPrivate(){
		Util::invokeMethod(new TrainingUtil, 'getNotSubscribedPersons', array(860)); 
	}


	public function testAnnotation(){

		Util::check_for_annotation_class("TrainingUtil", "myAnnot");
	}

}
