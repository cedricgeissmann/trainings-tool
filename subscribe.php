<?php
//include 'init.php';
?>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />

<script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
<script type="text/javascript" src="js/jquery-ui-1.10.4.custom.min.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>

<!--<script type="text/javascript" src="js/bootstrap-formhelpers-phone.js"></script>-->

<!-- loading third party libraries -->
<!--<script type="text/javascript" src="js/json2html.js"></script>
<script type="text/javascript" src="js/md5.js"></script>-->

<!-- loading the transformations needed by json2html -->
<!--<script type="text/javascript" src="transformation/profileTransforms/profileTransform.js"></script>
<script type="text/javascript" src="transformation/profileTransforms/teamListTransform.js"></script>
<script type="text/javascript" src="transformation/profileTransforms/userSelectionTransform.js"></script>

<script type="text/javascript" src="transformation/defaultNotification.js"></script>-->


<!-- loading own libraries -->
<!--<script type="text/javascript" src="javascript/util.js"></script>-->
<!--<script type="text/javascript" src="javascript/profile.js"></script>-->

<!-- Importing a font from google api -->
<link href='http://fonts.googleapis.com/css?family=Varela+Round'
	rel='stylesheet' type='text/css'>

<link href="css/bootstrap-theme.min.css" rel="stylesheet"
	type="text/css">
<link href="css/bootstrap.min.css" rel="stylesheet" type="text/css">
<link rel="stylesheet" href="css/jquery-ui-1.10.4.custom.min.css"/>
<link href="css/tvm-volleyball.css" rel="stylesheet" type="text/css">
</head>
<body>

<div class="container">
    <div class="row">
    	<div id="notificationArea"></div>
        <div id="content">
					 <form id="subscribe-form" action="server/subscribe_person.php" method="POST">

					<div class="panel panel-default">
						<div class="panel-heading">
							Angaben zur Person
						</div>
						<div class="panel-body">


						<div class="form-group">
							<label for="subscribe-username">Benutzername</label>
							<input type="text" class="form-control" id="subscribe-username" name="username" placeholder="Benutzername"/>
						</div>

						<div class="form-group">
							<label for="subscribe-firstname">Vorname</label>
							<input type="text" class="form-control" id="subscribe-firstname" name="firstname" placeholder="Vorname"/>
						</div>

						<div class="form-group">
							<label for="subscribe-name">Nachname</label>
							<input type="text" class="form-control" id="subscribe-name" name="name" placeholder="Nachname"/>
						</div>

						<div class="form-group">
							<label for="subscribe-name">Geburtsdatum</label>
							<input type="date" class="form-control" id="subscribe-date" name="date" placeholder="2016-04-12"/>
						</div>


						<div class="form-group">
							<label for="subscribe-mail">E-Mail</label>
							<input type="email" class="form-control" id="subscribe-mail" name="mail" placeholder="E-Mail"/>
						</div>

						<div class="form-group">
							<label for="subscribe-phone">Telefon</label>
							<input type="text" class="form-control" id="subscribe-phone" name="phone" placeholder="+41 xx xxx xx xx"/>
						</div>

						<div class="form-group">
							<label for="subscribe-password1">Passwort</label>
							<input type="password" class="form-control" id="subscribe-password1" name="password1" placeholder=""/>
						</div>

						<div class="form-group">
							<label for="subscribe-password2">Passwort wiederhohlen</label>
							<input type="password" class="form-control" id="subscribe-password2" name="password2" placeholder=""/>
						</div>

						</div>

</div>


					<div class="panel panel-default">
						<div class="panel-heading">
							Adresse
						</div>
						<div class="panel-body">

						<div class="form-group">
							<label for="subscribe-streetname">Strasse</label>
							<input type="text" class="form-control" id="subscribe-streetname" name="streetname" placeholder="Strasse"/>
						</div>

						<div class="form-group">
							<label for="subscribe-streetnumber">Nummer</label>
							<input type="text" class="form-control" id="subscribe-streetnumber" name="streetnumber" placeholder="Nummer"/>
						</div>


						<div class="form-group">
							<label for="subscribe-plz">PLZ</label>
							<input type="text" class="form-control" id="subscribe-plz" name="plz" placeholder="PLZ"/>
						</div>

						<div class="form-group">
							<label for="subscribe-city">Stadt</label>
							<input type="text" class="form-control" id="subscribe-stadt" name="stadt" placeholder="Stadt"/>
						</div>

						</div>
</div>

					<div class="panel panel-default">
						<div class="panel-heading">
							Einschrieben
						</div>
						<div class="panel-body">
							<div class="form-group">
							<label for="submit-button">Einschrieben f&uumlr Damen 2</label>
							<button class="btn btn-primary" type="submit">Einschreiben</button>
						</div>
						</div>

						</div>
					</form> 
        </div>
        <div id="comment"></div>
    </div>
</div>

<div class="modal fade" id="modalAlert">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title">Bitte noch ausfüllen...</h4>
      </div>
      <div class="modal-body" id="modalContent">
        
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-dismiss="modal">Schliessen</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<div class="modal fade" id="notificationModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title">Info</h4>
      </div>
      <div class="modal-body" id="notificationModalContent">
        
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-dismiss="modal">Schliessen</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->


<div id="removeNext"></div>
</html>
