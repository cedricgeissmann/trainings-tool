<?php
	include 'check_login.php';
?>
<!DOCTYPE html>
<html>
<head>
<title>TVMuttenz Volleyball Herren</title>
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

<body onload="loadTraining(sessionStorage.type)">
	<header>
		<h1>TVMuttenz Volleyball</h1>
	</header>

	<?php
		include "navbar.php";
	?>

	<?php
		include "createNewGameEntry.php";
	?>
	<div id="response"></div>
	<div id="comment"></div>

	<div class="modal fade" id="modalcedy" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h4 class="modal-title">Modal title</h4>
        </div>
        <div class="modal-body">
          ...
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
  </div>
	
<!-- </body> --></body>

</html>
