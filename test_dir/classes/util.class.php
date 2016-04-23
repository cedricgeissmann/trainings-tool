<?php


class Util{

	public static function invokeMethod(&$object, $methodName, array $parameters = array()) {
    $reflection = new \ReflectionClass(get_class($object));
    $method = $reflection->getMethod($methodName);
    $method->setAccessible(true);

    return $method->invokeArgs($object, $parameters);
	}


	/**
	* This function checks if the class has the given annotation
	*/
	public static function check_for_annotation_class($class_name, $annotation){
		$reader = new Reader($class_name);
		if( $reader->getParameter($annotation) === NULL ){
			return FALSE;
		}
		return TRUE;
	}



	/**
	* This function checks if the function in this class has the given annotation
	*/
	public static function check_for_annotation_function($class_name, $function_name, $annotation){
		$reader = new Reader($class_name, $function_name);
		if( $reader->getParameter($annotation) === NULL ){
			return FALSE;
		}
		return TRUE;
	}

	public static function get_functions_with_annotation($class_name, $annotation){
		$ref = new \ReflectionClass($class_name);
		$all_functions = $ref->getMethods();
		$functions_with_annotation = array();
		foreach($all_functions as $function){
			if( self::check_for_annotation_function($class_name, $function->name, $annotation) ){
				$functions_with_annotation[] = $function->name;
			}
		}

		return $functions_with_annotation;

	}


}


?>
