<?php
	include_once 'check_login.php';
	include_once 'DatabaseUtil.php';
	include_once 'AdminUtil.php';
	
	if($_SESSION["user"]["admin"]!=1){
		header("Location: main.php");
	}
?>

<html>
	<head>
		<title>TVMuttenz Volleyball</title>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta name="viewport" content="width=device-width"> 
	
        <script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
        
		<script type="text/javascript" src="js/bootstrap.js"></script>
		<script type="text/javascript" src="js/bootstrap-formhelpers-phone.js"></script>
		<script type="text/javascript" src="js/jquery.ui.position.js"></script>
		<script type="text/javascript" src="js/jquery.contextMenu.js"></script>
		<script type="text/javascript" src="js/jquery.flot.min.js"></script>
		<script type="text/javascript" src="js/jquery.flot.time.js"></script>
		<script type="text/javascript" src="javascript/allgemein.js"></script>
		
		<link href="css/default.css" rel="stylesheet" type="text/css">
		<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
		<link href="css/bootstrap-responsive.css" rel="stylesheet" type="text/css">
		<link href="css/jquery.contextMenu.css" rel="stylesheet" type="text/css">
		
</head>
	<body>
		<?php
			include "navbar.php";
		?>
		
		<?php 
			$res = DatabaseUtil::executeQuery("SELECT * FROM `user`");
			while($row = mysql_fetch_array($res)){

		?>
		<div class="container-fluid well">
		<h4> <?php echo $row[firstname] . " " . $row[name] ?> </h4>
			<p id="<?php echo $row[username] ?>" class="person"><?php echo $row[username] ?></p>
			<div class="btn-group pull-right">
                <button class="btn dropdown-toggle" data-toggle="dropdown">Action <span class="caret"></span></button>
                <ul class="dropdown-menu">
                  <li><a href="#" onclick="activate('<?php echo $row[username]?>', 1)">Freischalten</a></li>
                  <li><a href="#" onclick="activate('<?php echo $row[username]?>', 0)">Sperren</a></li>
                  <li><a href="#" onclick="changeTrainer('<?php echo $row[username]?>', 1)">Trainerrechte gewähren</a></li>
                  <li><a href="#" onclick="changeTrainer('<?php echo $row[username]?>', 0)">Trainerrechte verwerfen</a></li>
                  <li><a href="#" onclick="changeAdmin('<?php echo $row[username]?>', 1)">Adminrechte gewähren</a></li>
                  <li><a href="#" onclick="changeAdmin('<?php echo $row[username]?>', 0)">Adminrechte verwerfen</a></li>
                  <li class="divider"></li>
                  <li><a href="#" onclick="deleteUser('<?php echo $row[username]?>')">Benutzer löschen</a></li>
                </ul>
              </div>
			<div  class="plot" id="flot-<?php echo $row[username]?>"></div>

	</div>
		<?php 
			}
		?>
		
		<div id="comment"></div>
		<div id="response"></div>
	<!-- </body> --></body>
</html>
