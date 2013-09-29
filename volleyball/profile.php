<?php
	include 'init.php';
	include 'ProfileUtil.php';
?>

<!DOCTYPE html>
<html>
<head>
        <?php 
        	include 'head.php';
        ?>
    </head>
<body>
    
    <?php 
    	include "navbar.php";
    ?>

    <?php
    	$user = ProfileUtil::getUserInformations($_SESSION["user"]["username"]);
    ?>
    <div class="container">
		<div class="row">
			<div class="bs-sidebar col-sm-3">
				<ul id="profileNavbar" class="nav bs-sidenav nav-stacked">
					<li class="nav-header">Trainings</li>
					<li><a href="#person">Angaben zur Person</a></li>
					<li><a href="#password">Passwort ändern</a></li>
					<li><a href="#address">Adresse</a></li>
					<li class="nav-header">Standart Anmeldung</li>
					<li><a href="#address">An- / Abmeldung</a></li>
				</ul>
			</div>
			<div class="col-sm-9">
			<form class="form-horizontal" action="ProfileUtil.php"
				method="POST">
				<h2>Profil</h2>
				<div class="panel panel-default form-group" id="person">
					<div class="panel-heading">
						<h3>Angaben zur Person</h3>
					</div>
					<div class="panel-body">
						<label for="username" class="control-label">Benutzername</label>
						<div>
							<input name="username" id="username" type="text"
								class="form-control" readonly
								value="<?php echo $user[username]?>">
						</div>
						<label for="firstname" class="control-label">Vorname</label>
						<div>
							<input name="firstname" id="firstname" type="text"
								class="form-control" value="<?php echo $user[firstname]?>">
						</div>
						<label for="name" class="control-label">Name</label>
						<div>
							<input name="name" id="name" type="text" class="form-control"
								value="<?php echo $user[name]?>">
						</div>
						<label for="phone" class="control-label">Telefon</label>
						<div>
							<input name="phone" type="text" class="form-control bfh-phone"
								data-format="+41 dd ddd dd dd"
								data-number="<?php echo $user[phone]?>">
						</div>
						<label for="mail" class="control-label">E-mail</label>
						<div>
							<input name="mail" id="mail" type="email" class="form-control"
								value="<?php echo $user[mail]?>">
						</div>
					</div>
				</div>

				<div class="panel panel-default form-group" id="password">
					<div class='panel-heading'>
						<h3>Passwort ändern</h3>
					</div>
					<div class='panel-body'>
					<label for="oldPassword" class="control-label">Altes Passwort</label>
					<div>
						<input name="oldPassword" type="password" class="form-control">
					</div>
					<label for="newPassword" class="control-label">Neues Passwort</label>
					<div>
						<input name="newPassword" type="password" class="form-control">
					</div>
					<label for="newPasswordConfirm" class="control-label">Neues Passwort bestätigen</label>
					<div>
						<input name="newPasswordConfirm" type="password" class="form-control">
					</div>
					</div>
				</div>
		
		<?php 
		$row = ProfileUtil::getAddressFromUser($_SESSION["user"]["username"]);
		?>
		
		<div class="panel panel-default form-group" id="address">
					<div class="panel-heading">
						<h3>Adresse</h3>
					</div>
					<div class="panel-body">
					<label for="street" class="control-label">Strasse</label>
					<div>
					<input name="street" type="text"
						class="form-control" value="<?php echo $row[street]?>">
						<input name="streetNumber" type="number" class="form-control" value="<?php echo $row[street_number]?>">
					</div>
					<label for="zip" class="control-label">Wohnort</label>
					<div class="">
					<input name="zip" type="number" class="form-control col-xs-2" value="<?php echo $row[zip]?>">
					<input name="city" type="text" class="form-control col-xs-10" value="<?php echo $row[city]?>">
					</div>
					</div>
				</div>
				<button name="function" class="btn btn-default" value="updateUser">Abschicken</button>
			</form>

		<div class="" id="#defaultSignup">
        	
        	<?php 
        		$res = DatabaseUtil::executeQuery("SELECT * FROM `default_training`");
        		$echoString = "";
        		while($row = mysql_fetch_array($res)){
					$tmp = "$row[day] $row[time_start] - $row[time_end] $row[location]";
			?>
			<div class="panel panel-default">
				<div class="panel-heading"><?php echo $tmp;?></div>
				<div class="panel-body">
					<button class="btn btn-default col-sm-6"
						onclick="defaultSubscribe(1, <?php echo $row['id'];?>)">Anmelden</button>
					<button class="btn btn-default col-sm-6"
						onclick="defaultSubscribe(0, <?php echo $row['id'];?>)">Abmelden</button>
				</div>
			</div>
        	<?php }?>
        </div>
        	</div>
	</div>
	<div id="removeNext"></div>
	<!-- </body> -->
</body>
</html>
