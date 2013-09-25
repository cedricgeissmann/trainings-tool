<?php
include 'Training.php';
?>
<!DOCTYPE html>
<!--
To change this template, choose Tools | Templates
and open the template in the editor.
-->



<html>
<head>
<title>TVMuttenz Volleyball Herren</title>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width">
<script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
<script type="text/javascript" src="javascript/md5.js"></script>
<script type="text/javascript" src="javascript/allgemein.js"></script>
<script type="text/javascript" src="js/bootstrap.js"></script>
<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="css/bootstrap-responsive.css" rel="stylesheet"
	type="text/css">
<link href="css/tvm.css" rel="stylesheet" type="text/css">
</head>
<body>
	<header class="well">
		<div class="container">
			<div class="row">
				<div class="span">

					<h1>
						<!--<img alt="TVM-Logo" src="img/tvm-logo.jpg">-->
						TVMuttenz Volleyball
					</h1>
				</div>
				<div class="span pull-right tvm-title">
					<a id="signUp-button" href="login-formular.html" class="btn">Einschreiben</a>
				</div>
			</div>
		</div>
	</header>
	<div class="container">
		<div class='row'>
			<div class='span8'>
				<article>
					<h2>Nächstes Training</h2>
					<?php
						echo Training::getNexttraining('training');
					?>
					<h2>Nächstes Spiel</h2>
					<?php
						echo Training::getNexttraining('game');
					?>
					<h2>Nächstes Turnier</h2>
					<?php
						echo Training::getNexttraining('tournament');
					?>
					<h2>Nächstes Beachvolleyball</h2>
					<?php
						echo Training::getNexttraining('beach');
					?>
				</article>
			</div>
			<div class='span well'>
				<form id="login" action="login.php" method="POST">
					<h2>Login</h2>
					<div>
						<label>Benutzername</label> <input name="username" id="login_name"
							type="text"> <label>Passwort</label> <input name="password"
							id="password" type="password">
					</div>
					<button id="loginButton" name="login" class="btn">Login</button>
				</form>
			</div>
		</div>
	</div>
	<div id="removeNext"></div>
	<!-- </body> -->
</body>
</html>
