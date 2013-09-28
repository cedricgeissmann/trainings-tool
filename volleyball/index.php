<?php
include 'init.php';
include 'Training.php';
?>
<!DOCTYPE html>
<html>
<head>
<?php
include 'head.php';
?>
</head>
<body>
	<header class="well">
		<div class="container">
			<div class="row">
				<div class="col-xs-10">

					<h1>
						<!--<img alt="TVM-Logo" src="img/tvm-logo.jpg">-->
						TVMuttenz Volleyball
					</h1>
				</div>
				<div class="col-xs-2">
					<a id="signUp-button" href="login-formular.html"
						class="btn btn-default">Einschreiben</a>
				</div>
			</div>
		</div>
	</header>
	<div class="container">
		<div class='row'>
			<div class='col-sm-9'>
				<article>
					<h2>Nächstes Training</h2>
					<?php
					echo Training::getNexttraining ( 'training' );
					?>
					<h2>Nächstes Spiel</h2>
					<?php
					echo Training::getNexttraining ( 'game' );
					?>
					<h2>Nächstes Turnier</h2>
					<?php
					echo Training::getNexttraining ( 'tournament' );
					?>
					<h2>Nächstes Beachvolleyball</h2>
					<?php
					echo Training::getNexttraining ( 'beach' );
					?>
				</article>
			</div>
			<div class='col-sm-3 well'>
				<form id="login" action="login.php" method="POST"
					class="form-horizontal" role="form">
					<h2>Login</h2>
					<div class="form-group">
						<label for="loginName" class="col-sd-2 control-label">Benutzername</label>
						<div class="col-sd-10">
							<input name="username" class="form-control" id="loginName"
								type="text">
						</div>
						<label for="loginPassword" class="col-sd-2 control-label">Passwort</label>
						<div class="col-sd-10">
							<input name="password" class="form-control" id="" passwort
								type="password">
						</div>
					</div>
					<div class="form-group">
						<div class="col-lg-offset-2 col-lg-10">
							<button id="loginButton" type="submit" class="btn btn-default">Anmelden</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
	<div id="removeNext"></div>
	<!-- </body> -->
</body>
</html>
