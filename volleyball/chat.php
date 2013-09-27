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
		<script type="text/javascript" src="js/json2html.js"></script>
		<script type="text/javascript" src="js/jquery.json2html.js"></script>
		<script type="text/javascript" src="javascript/allgemein.js"></script>
		
		<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
		<link href="css/bootstrap-responsive.css" rel="stylesheet" type="text/css">
		<link href="css/bootstrap-switch.css" rel="stylesheet" type="text/css">
		<link href="css/jquery.contextMenu.css" rel="stylesheet" type="text/css">
		
</head>

<body>
	<header>
		<h1>TVMuttenz Volleyball | Chat</h1>
	</header>

	<?php
		include "navbar.php";
	?>
	
	<div class="row">
	<div class="sidebar-nav span3">
		<ul class="nav-list nav">
			<li><a href="#">Cedy</a></li>
			<li><a href="#">Cedi</a></li>
			<li><a href="#">Fabian</a></li>
		</ul>
	</div>
	
	<section id="message" class="span9">
		<header>
			<h1>Hello</h1>
		</header>
		<article>
		Hello World!!
		</article>
	</section>
	</div>	
	
	<div id="response">

		<button class="btn" onclick="sendMessage('cedi', 'cedy', 'Test')">Send message</button>
	</div>
	<div id="comment"></div>
	
<!-- </body> --></body>

</html>
