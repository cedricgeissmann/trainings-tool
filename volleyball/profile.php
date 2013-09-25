<?php
	include 'check_login.php';
	include 'ProfileUtil.php';
?>

<!DOCTYPE html>
<html>
    <head>
        <title>Profil</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width"> 
        
        <script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
        <script type="text/javascript">sessionStorage.type="profile";</script>
        <script type="text/javascript" src="javascript/allgemein.js"></script>
		<script type="text/javascript" src="js/bootstrap.js"></script>
		<script type="text/javascript" src="js/bootstrap-formhelpers-phone.js"></script>
		<link href="css/default.css" rel="stylesheet" type="text/css"></link>
		<link href="css/bootstrap.css" rel="stylesheet" type="text/css"></link>
		<link href="css/bootstrap-responsive.css" rel="stylesheet" type="text/css"></link>
    </head>
    <body><!-- onload="getProfile()">-->
    
    <?php 
    	include "navbar.php";
    ?>

    <?php
    	$user = ProfileUtil::getUserInformations($_SESSION["user"]["username"]);
    ?>
<div class="container-fluid well">
<div class="well sidebar-nav span3">
	<ul id="trainingsNavbar" class="nav nav-list">
		<li class="nav-header">Trainings</li>
		<li><a href="#person">Angaben zur Person</a></li>
		<li><a href="#password">Passwort ändern</a></li>
		<li><a href="#address">Adresse</a></li>
		<li class="nav-header">Standart Anmeldung</li>
		<li><a href="#address">An- / Abmeldung</a></li>
	</ul>
</div>
	<form class="well span9" action="ProfileUtil.php" method="POST">
		<h2>Profil</h2>
		<div class="well" id="person">
			<header><h3>Angaben zur Person</h3></header>
			<label>Benutzername</label> 
			<input name="username" type="text" class="span3" readonly value="<?php echo $user[username]?>">
			<label>Vorname</label>
			<input name="firstname" type="text" class="span3" value="<?php echo $user[firstname]?>">
			<label>Nachname</label> 
			<input name="name" type="text" class="span3" value="<?php echo $user[name]?>">
			<label>Telefon</label>
			<input name="phone" type="text" class="span3 bfh-phone" data-format="+41 dd ddd dd dd" data-number="<?php echo $user[phone]?>">
			<label>E-mail</label>
			<input name="mail" type="email" class="span3" value="<?php echo $user[mail]?>">
		</div>
		<div class="well" id="password">
			<header><h3>Passwort ändern</h3></header>
			<label>Altes Passwort</label>
			<input name="oldPassword" type="password" class="span3">
			<label>Neues Passwort</label>
			<input name="newPassword" type="password" class="span3">
			<label>Neues Passwort bestätigen</label>
			<input name="newPasswordConfirm" type="password" class="span3">
		</div>
		
		<?php 
		$row = ProfileUtil::getAddressFromUser($_SESSION["user"]["username"]);
		?>
		
		<div class="well" id="address">
			<header><h3>Adresse</h3></header>
			<label>Strasse</label>
			<input name="street" type="text" class="span3" value="<?php echo $row[street]?>"> <input name="streetNumber" type="number" class="span1"value="<?php echo $row[street_number]?>">
			<label>Wohnort</label>
			<input name="zip" type="number" class="span1" value="<?php echo $row[zip]?>"> <input name="city" type="text" class="span3" value="<?php echo $row[city]?>">
		</div>
		<button name="function" class="btn" value="updateUser">Abschicken</button>
	</form>
</div>
        
        
        
        <div class="container-fluid well" id="#defaultSignup">
        	
        	<?php 
        		$res = DatabaseUtil::executeQuery("SELECT * FROM `default_training`");
        		$echoString = "";
        		while($row = mysql_fetch_array($res)){
					$tmp = "$row[day] $row[time_start] - $row[time_end] $row[location]";
			?>
			<div class="well span container-fluid">
			<h4><?php echo $tmp;?></h4>
			<div class="span"><button class="btn" onclick="defaultSubscribe(1, <?php echo $row['id'];?>)">Anmelden</button></div>
			<div class="span"><button class="btn" onclick="defaultSubscribe(0, <?php echo $row['id'];?>)">Abmelden</button></div>
        	</div>
        	<?php }?>
        </div>   
    <!-- </body> --></body>
</html>
