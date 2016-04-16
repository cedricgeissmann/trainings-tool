<?php

var_dump($_SERVER);

echo "<br>";

include $_SERVER['DOCUMENT_ROOT'] . 'server/DatabaseUtil.php';

echo "DatabaseUtil is successfully included<br>";

$config = new ConnectionInformation();

echo DatabaseUtil::executeQueryAsJSON("SELECT * FROM user");

?>
