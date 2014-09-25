<?php

include "check_login.php";
include "connect.php";

$password = md5(mysql_real_escape_string($_POST["password"]));

$sql = "UPDATE `user` SET password='$password' WHERE username='".$_SESSION["user"]["username"]."'";
mysql_query($sql, $link) or die(mysql_error());

mysql_close($link);

?>