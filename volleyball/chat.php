<?php
	include 'check_login.php';
	require 'DatabaseUtil.php';
?>
<!DOCTYPE html>
<html>
<head>
	<?php 
		include 'head.php';
	?>
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
