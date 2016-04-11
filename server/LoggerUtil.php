<?php


class LoggerUtil{
	

	private $logfilename = "";
	private $logFileHandle = NULL;
	private $DEBUG = false;
	
	public function __construct(){
		$config = parse_ini_file('../config.ini');
		$this->logfilename = $config['main_log_path'] . '/default.log';
		if($this->DEBUG){
			$this->openLogFile();
		}
	}
	
	
	/**
	 * Opens the logfile in append mode.
	 */
	private function openLogfile(){
		if($this->DEBUG){
			if (is_writable($this->logfilename)) {
				if (!$this->logFileHandle = fopen($this->logfilename, "a")) {
	         		echo "Kann die Datei $this->logfilename nicht öffnen";
	        		exit;
	    		}
			}else{
				echo "Die Datei $this->logfilename ist nicht schreibbar";
				exit;
			}
		}
	}
	
	/**
	 * Closes the logfile.
	 */
	private function closeLogfile(){
		if($this->DEBUG){
			fclose($this->logFileHandle);
		}
	}
    
	/**
	 * Write to the logfile. Appends a new line with the exact time when an event occures with the username and the action a user executed.
	 * @param String $username the name of the user who executet an action.
	 * @param String $action the action the user executed.
	 */
	public function writeLog($username, $action){
		if($this->DEBUG){
			$time = date("Y-m-d H:i:s");
			$content = "$time	$username:	$action\n";
			if (!fwrite($this->logFileHandle, $content)) {
		    	print "Kann in die Datei $this->logfilename nicht schreiben";
		    	exit;
			}
		}
	}
	
	
	
	
}

?>
