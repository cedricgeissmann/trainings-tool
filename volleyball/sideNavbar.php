<div class="well sidebar-nav span3">
	<ul id="trainingsNavbar" class="nav nav-list">
		<li class="nav-header">Trainings</li>
		<?php 
		$sql = "SELECT * FROM `training` WHERE type='$type' AND date>='".date("Y-m-d")."' ORDER BY date ASC";
		$res = mysql_query($sql, $link);
		echo $training->addTrainingsNavbarEntry($res);
		?>
	</ul>
</div>