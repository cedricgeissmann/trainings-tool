<?php
	include 'check_login.php';
	require 'DatabaseUtil.php';
	require 'ChatUtil.php';
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
		<h1>TVMuttenz Volleyball</h1>
	</header>

	<?php
		include "navbar.php";
	?>
	
	<div class="container">
	<div class="row">
		<div class="sidebar-nav col-sm-3">
			<ul class="nav-list nav">
				<?php 
					echo ChatUtil::getTeamMembers($_SESSION['user']['username']);
				?>
			</ul>
		</div>
	
		<div class="col-sm-8">
     		<textarea id="msg" class="form-control" rows="10"></textarea>
        	<button class="btn btn-default pull-right" type="button" onclick="sendMessage()">Senden</button>
			<hr>
			<div id="message"></div> 
		</div>
	</div>	
	</div>
	
	<div id="response"></div>
	<div id="comment"></div>
	
<!-- </body> --></body>

</html>
