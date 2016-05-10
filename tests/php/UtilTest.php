<?php

require_once __DIR__ . "/../../init.php";



class UtilTest extends PHPUnit_Framework_Testcase{

	//Check if class has annotation
	public function testClassDoesNotHaveAnnotation(){
		$this->assertFalse(Util::check_for_annotation_class("TrainingUtil", "does_not_exist"));
	}

	public function testClassHasAnnotation(){
		$this->assertTrue(Util::check_for_annotation_class("TrainingUtil", "router_may_call"));
	}


	//Check if functions have annotation
	public function testFunctionDoesNotHaveAnnotation(){
		$this->assertFalse(Util::check_for_annotation_function("TrainingUtil", "getTraining", "does_not_exist"));
	}

	public function testFunctionHasAnnotation(){
		$this->assertTrue(Util::check_for_annotation_function("TrainingUtil", "getTraining", "router_may_call"));
	}

}




?>
