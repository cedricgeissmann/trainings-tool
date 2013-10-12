<?php
	include 'init.php';
	include 'AdminUtil.php';
	
	if($_SESSION["user"]["admin"]!=1){
		header("Location: main.php");
	}
?>

<html>
	<head>
		<?php 
			include "head.php";
		?>
		
</head>
	<body>
		<?php
			include "navbar.php";
		?>
		
		<div class="container">
			<div class="row">
				
		<?php 
			$username = $_SESSION['user']['username'];
			$res = DatabaseUtil::executeQuery("SELECT * FROM `teams` INNER JOIN role ON (role.tid=teams.id) WHERE role.username='$username'");
			while($row = mysql_fetch_assoc($res)){
				?>
				<div class="panel panel-default col-sm-6">
					<div class="panel panel-heading">
						<?php echo $row["name"]?>
					</div>
					<div class="panel panel-body">
						<?php 
							$resMembers = DatabaseUtil::executeQuery("SELECT DISTINCT * FROM `user` INNER JOIN role ON (role.username=user.username) WHERE tid=$row[tid]");
							while($rowMember = mysql_fetch_assoc($resMembers)){
								echo "<p>$rowMember[firstname] $rowMember[name]</p>";
							}
						?>
					</div>
				</div>
				<?php 
			}

		?>
		</div>
		</div>
		
		<!-- 
		<div class="panel panel-body">
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
	 -->
		<?php 
// 			}
		?>
		
		<div id="comment"></div>
		<div id="response"></div>
	<!-- </body> --></body>
</html>
