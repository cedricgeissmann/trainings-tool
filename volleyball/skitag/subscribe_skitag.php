<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width">
<script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
	<script type="text/javascript" src="../js/bootstrap.min.js"></script>
	
	
	<link href="../css/bootstrap-theme.min.css" rel="stylesheet" type="text/css">
	<link href="../css/bootstrap.min.css" rel="stylesheet" type="text/css">
	<script type="text/javascript">
	$('document').ready(function(){
		$('#adremover').nextAll().remove();
	});	
	</script>
<title>Skitag</title>
</head>
<body>
<?php 
	include "../DatabaseUtil.php";
	
	$name = mysql_escape_string($_POST["name"]);
	$firstname = mysql_escape_string($_POST["firstname"]);
	$year = mysql_escape_string($_POST["year"]);
	
	$res = DatabaseUtil::executeQuery("SELECT * FROM skitag WHERE firstname='$firstname' AND name='$name'");

	if(mysql_num_rows($res)==0){
		DatabaseUtil::executeQuery("INSERT INTO skitag (firstname, name, year) VALUES ('$firstname', '$name', $year)");
		echo "<h1 class='text-center pagination-centered' style='margin-top:20%;'>Erfolgreich angemeldet</h1>";
	}else{
		echo "<h1 class='text-center pagination-centered' style='margin-top:20%;'>Sie sind bereits angemeldet</h1>";
	}
	
?>
<div id="adremover"></div>
</body>