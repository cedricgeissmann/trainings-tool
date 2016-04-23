<?php

require_once __DIR__ . "/../init.php";

class RouterTest extends PHPUnit_Framework_Testcase{



	protected function setUp(){
		$this->auth = Auth::construct_with_log_in("cedy", md5("ced-jes"));
		$this->training = new TrainingUtil();
	}


	protected function tearDown(){
		Auth::logout();
	}



	public function testGetTrainingReturnsArray(){
		$router = new Router();
		$this->assertTrue( is_array($router->call_serverside_function("TrainingUtil", "getTraining")) );
	}




	public function testCallCreateNextTrainings(){
		$router = new Router();
		$this->assertFalse( $router->call_serverside_function("TrainingUtil", "createNextTrainings") );
	}

	/* public function testServerSideFunctionReturnsArray(){ */
	/* 	$router = new Router(); */
	/* 	$allowed_functions = Util::get_functions_with_annotation("TrainingUtil", "router_may_call"); */
	/* 	foreach($allowed_functions as $function){ */
	/* 		$this->assertTrue( is_array($router->call_serverside_function("TrainingUtil", $function)) ); */
	/* 	} */
	/* } */


}

?>
