<?php

include 'check_login.php';
include 'connect.php';

$trainingsID = $_POST["trainingsID"];

$sql = "DELETE FROM `trainingsPlan` WHERE trainingsID='$trainingsID'";
mysql_query($sql, $link) or die(mysql_error());
mysql_close($link);

?>