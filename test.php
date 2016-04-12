<?php

include 'server/DatabaseUtil.php';

echo "DatabaseUtil is successfully included<br>";

echo $_SERVER["HTTP_POST"] . "<br>";

var_dump($_SERVER);

echo "<br>";

$config = new ConnectionInformation();

echo DatabaseUtil::executeQueryAsJSON("SELECT * FROM user");

?>
