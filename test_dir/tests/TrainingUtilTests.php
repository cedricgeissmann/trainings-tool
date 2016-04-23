<?php

require_once "../init.php";

$_SESSION["auth"] = TRUE;
$_SESSION["user"]["username"] = "cedy";


$training = new TrainingUtil();

echo "Test attendence Check: <br>";
print_r( $training->selectTrainingsWithTrainersAllowedForAttendanceCheck() );
echo "<br><br>";
print_r( $training->attendanceCheck() );
