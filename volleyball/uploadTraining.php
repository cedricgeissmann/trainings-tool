<?php
include 'check_login.php';
include 'connect.php';

$trainingsID = $_POST["trainingsID"];
$t1 = $_POST["t1"];
$t2 = $_POST["t2"];
$duration = mysql_real_escape_string($_POST["duration"]);
$title = mysql_real_escape_string($_POST["title"]);
$description = mysql_real_escape_string($_POST["description"]);


$sql = "INSERT INTO `trainingsPlan` (trainingsID, titel, beschreibung, zeit_start, zeit_end, dauer) VALUES ('$trainingsID', '$title', '$description', '$t1', '$t2', '$duration')";
mysql_query($sql, $link) or die(mysql_error());
mysql_close($link);

echo "sucsses";

?>