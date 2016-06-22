<?php

/**
 * Wrapper around setcookie function for better testability
 */ 
class Cookiesetter {
  public function setcookie($name, $value = "",  $expire = 0,  $path = "", $domain = "", $secure = false, $httponly = false) {
		if( !headers_sent() ){
			return setcookie($name, $value,  $expire, $path, $domain, $secure, $httponly);
		}
		return false;
  }
}


?>
