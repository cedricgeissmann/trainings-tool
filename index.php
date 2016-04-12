<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />

	<script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
	<script type="text/javascript" src="js/bootstrap.min.js"></script>
	<script type="text/javascript" src="javascript/util.js"></script>
	<script type="text/javascript" src="javascript/index.js"></script>

	<script type="text/javascript" src="transformation/defaultNotification.js"></script>

	<!-- Importing a font from google api -->
	<link href='http://fonts.googleapis.com/css?family=Varela+Round' rel='stylesheet' type='text/css'>

	<link href="css/bootstrap-theme.min.css" rel="stylesheet" type="text/css">
	<link href="css/bootstrap.min.css" rel="stylesheet" type="text/css">
	<link href="css/tvm-volleyball.css" rel="stylesheet" type="text/css">
</head>
<body>
	<div class="container centered">
		<img class="hidden-xs centered" src="img/tvm-logo.svg"></img>
			<div class="col-xs-4 centered">
				<form id="login" method="POST" action="login.php">
					<div class="form-group">
					<h2 class="form-center">Login</h2>
					<div id="notificationArea" class="notification"></div>
					</div>
						<div class="form-group">
							<input name="username" class="form-control" id="loginName" type="text" placeholder="Benutzername">
						</div>
						<div class="form-group">
							<input name="password" class="form-control" id="password" type="password" placeholder="Passwort">
						</div>
					<div class="form-center">
							<button id="loginButton" type="button" class="btn btn-primary">Anmelden</button>
					</div>
					<div class="form-center">
							oder <a id="signupLink" href="subscribe.php">Einschreiben</a>
					</div>
				</form>
			</div>
		</div>
	</div>

	<div id="removeNext"></div>
</html>
