<!-- Dies ist die Navigationsleiste -->
<style>
body{
	margin-top: 50px;
}
</style>

<div id="navbar" class="navbar navbar-inverse navbar-fixed-top">
	<div class="navbar-inner">
		<div class="container-fluid">
			<button type="button" class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</button>
			<a class="brand" href="#">TVMuttenz Volleyball Herren</a>
			<div class="nav-collapse collapse">
				<ul class="nav">
					<?php
						if($_SESSION["user"]["admin"]==1){
							echo "<li class='nav' ><a href='admin-formular.php'>Admin</a></li>";
						}
						if($_SESSION["user"]["trainer"]==1){
					 		echo "<li class='nav'><a href='trainer-formular.php'>Trainer</a></li>";
						}
					?>
					<li>
						<a href='main.php' onclick="setType('training')">Training</a>
					</li>
					<li>
						<a href='main.php' onclick="setType('game')">Spiele</a>
					</li>
					<li>
						<a href='main.php' onclick="setType('tournament')">Turniere</a>
					</li>
					<li>
						<a href='main.php' onclick="setType('beach')">Beach</a>
					</li>
					<li>
						<a href="logout.php">Logout</a>
					</li>
				</ul>
				<p class="navbar-text pull-right">
					Logged in as
					<a href="profile.php" class="navbar-link"><?php echo $_SESSION["user"]["username"];?></a>
				</p>
			</div>
		</div>
	</div>
</div>
