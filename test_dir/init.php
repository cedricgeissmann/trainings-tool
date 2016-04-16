<?php


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


$test = new Test();
$test->test();

new My_New();


$mustache = new ArrayResponse();
$mustache->add_data_to_mustache("hello", "world");
$mustache->add_data_to_mustache("cedy", array(firstname => "Cedric", name => "Geissmann"));

echo "<br><br>";

echo $mustache->get_data_for_mustache();

?>
