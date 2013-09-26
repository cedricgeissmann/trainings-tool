<?php
	include 'check_login.php';
	require 'DatabaseUtil.php';
?>
<!DOCTYPE html>
<html>
<head>
<title>TVMuttenz Volleyball | Chat</title>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta name="viewport" content="width=device-width"> 
	
        <script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
        
		<script type="text/javascript" src="js/bootstrap.js"></script>
		<script type="text/javascript" src="js/bootstrap-formhelpers-phone.js"></script>
		<script type="text/javascript" src="js/bootstrap-switch.js"></script>
		<script type="text/javascript" src="js/jquery.ui.position.js"></script>
		<script type="text/javascript" src="js/jquery.contextMenu.js"></script>
		<script type="text/javascript" src="javascript/allgemein.js"></script>
		
		<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
		<link href="css/bootstrap-responsive.css" rel="stylesheet" type="text/css">
		<link href="css/bootstrap-switch.css" rel="stylesheet" type="text/css">
		<link href="css/jquery.contextMenu.css" rel="stylesheet" type="text/css">
		
</head>

<body onload="getMessages()">
	<header>
		<h1>TVMuttenz Volleyball | Chat</h1>
	</header>

	<?php
		include "navbar.php";
	?>
	
	<?php 
	$username = $_SESSION[user][username];
	$resChat = DatabaseUtil::executeQuery("SELECT * FROM chat WHERE receiver='$username'");
	$chatArray = array();
	while($row=mysql_fetch_assoc($resChat)){
// 		$chatArray = array_merge($chatArray, $row);
		$chatArray[] = $row;
// 		var_dump($row);
// 		echo json_encode($row);
	}
// 	var_dump($chatArray);
	echo json_encode($chatArray);
	
	?>

	<div id="response">
		<button class="btn" onclick="sendMessage('cedi', 'cedy', 'Test')">Send message</button>
	</div>
	<div id="comment"></div>
	
<!-- </body> --></body>

</html>
