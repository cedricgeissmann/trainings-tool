<?php
include 'DatabaseUtil.php';
include 'ProfileUtil.php';

$username = $_POST["username"];
$firstname = $_POST["firstname"];
$name = $_POST["name"];

if(strlen($username) < 4){
	echo "Benutzername muss länger wie 4 Zeichen sein.";
	exit;
}
if(strlen($firstname) == 0){
	echo "Bitte Vorname angeben.";
	exit;
}

if(strlen($name) == 0){
	echo "Bitte Nachname angeben.";
	exit;
}


//check if username allready exists
$exists = DatabaseUtil::executeQueryAsArrayAssoc("SELECT COUNT(*) AS count FROM `user` WHERE (firstname='$firstname' AND name='$name') OR username='$username'");

if($exists[0]["count"] > 0){
	echo "Sie sind bereits angemeldet.";
	exit;
}else{
	echo "Sie werden angemeldet.";

		$date = ProfileUtil::convertDate($_POST["date"]);
		ProfileUtil::createNewUser($username, $firstname, $name, md5($_POST["password1"]), $date, $_POST["mail"], $_POST["phone"]);
		ProfileUtil::updateAddressForUser($username, $_POST["streetname"], $_POST["streetnumber"], $_POST["stadt"], $_POST["plz"]);
		DatabaseUtil::executeQuery("INSERT INTO `role` (username, tid) VALUES ('$username', '5')");
}

?>
