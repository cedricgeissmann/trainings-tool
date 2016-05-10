<?php

/**
 * Use output buffering because this should be the header file for each php-script on this server. It is possible that there is output in one of the autoloaded classes. Since this script uses sessions and cookies, the header will be sent if all session and cookie processing is finished.
 */
ob_start();

if( !isset($_SESSION) ){
	session_start();
}

/**
 * This is the only php-class which exists outside of the classes directory. This class is needed to autoload all the used php-classes from within the classes directory.
 */
class Autoloader
{
    /**
     * File extension as a string. Defaults to ".php".
     */
    protected static $fileExt = ".class.php";
		
		
		/**
     * The top level directory where recursion will begin. Defaults to the current
     * directory.
     */
    protected static $path_top = __DIR__;


    /**
     * Autoload function for registration with spl_autoload_register
     *
     * Looks recursively through project directory and loads class files based on
     * filename match.
     *
     * @param string $className
     */
    public static function loader($className){
        $directory = new RecursiveDirectoryIterator(self::get_path_to_top(), RecursiveDirectoryIterator::SKIP_DOTS);
				$fileIterator = new RecursiveIteratorIterator($directory, RecursiveIteratorIterator::LEAVES_ONLY);
        $filename = strtolower($className . self::$fileExt);
        foreach ($fileIterator as $file) {
            if (strtolower($file->getFilename()) === strtolower($filename)) {
                if ($file->isReadable()) {
                    include_once $file->getPathname();
                }
                break;
            }
        }
    }

    /**
     * Sets the $fileExt property
     *
     * @param string $fileExt The file extension used for class files.  Default is "php".
     */
    public static function setFileExt($fileExt){
			self::$fileExt = $fileExt;
		}

    /**
     * Sets the $path property
     *
     * @param string $path The path representing the top level where recursion should
     *                     begin. Defaults to the current directory.
     */
    public static function setPath($path){
        self::$path_top = $path;
    }


		/**
		 * Returns the path to the top dirs folder classes.
		 *
		 */
		private static function get_path_to_top(){
			return self::$path_top . "/classes";
		}
}



spl_autoload_register('Autoloader::loader');












/**
 * Here starts the test-section of the init.php header file. Delete this part if finished testing.
 */



//Currently testing the auth-class for user authentication.




/**
 * End of test-section. Everything below this comment may not be deleted.
 */

ob_end_flush();

?>
