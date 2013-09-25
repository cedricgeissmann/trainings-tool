<?php
include 'check_login.php';

include 'DatabaseUtil.php';

$date = $_POST['date'];
$time = $_POST['time'];
$location = $_POST['location'];
$enemy = $_POST['enemy'];
$meetingPoint = $_POST['meetingPoint'];
$type = $_POST['type'];

DatabaseUtil::executeQuery("INSERT INTO `training` (date, time_start, location, enemy, meeting_point, type) VALUES ('$date', '$time', '$location', '$enemy', '$meetingPoint', '$type')");
$URL="main.php";

header ("Location: $URL"); 
?>
