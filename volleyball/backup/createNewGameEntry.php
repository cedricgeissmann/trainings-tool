<?php
if($_SESSION["user"]["trainer"]==1 or $_SESSION["user"]["admin"]==1){
	?>
<form class="well" action="createGame.php" method="POST">
	<script type="text/javascript">
		$(function(){
			$('#toggle1').click(function() {
				    $('#showGame').toggle('slow');
				    return false;
				});
		});
		$(document).ready(function(){
			$('#type').val(sessionStorage.type);
		});
	</script>
	<header id="toggle1"><h2>Spiel erstellen</h2></header>
	<div id="showGame" class="well container-fluid" style="display: none">
		<label>Datum</label>
		<input name="date" type="date" class="span3">
		<label>Zeit</label>
		<input name="time" type="time" class="span3">
		<label>Ort</label> 
		<input name="location" type="text" class="span3"> 
		<label>Gegner</label> 
		<input name="enemy" type="text" class="span3">
		<label>Treffpunkt</label>
		<input name="meetingPoint" type="text" class="span3">
		<label></label>
		<button id="type" name="type" class="btn span2">Spiel erstellen</button>
	</div>
	
</form>
<?php }?>
