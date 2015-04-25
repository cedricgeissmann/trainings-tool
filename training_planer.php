<?php
include 'init.php';
?>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />  

<script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
<script type="text/javascript" src="js/jquery-ui-1.10.4.custom.min.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>


<!-- loading third party libraries -->
<script src='js/moment.min.js'></script>
<script src='js/fullcalendar.min.js'></script>
<script type="text/javascript" src="js/json2html.js"></script>
<script type="text/javascript" src="js/md5.js"></script>
<script type="text/javascript" src="js/jquery.cookie.js"></script>


<!-- loading the transformations needed by json2html -->
<script type="text/javascript" src="calendars/trainingPlanerCalendar.js"></script>

<!-- loading own libraries -->
<script type="text/javascript" src="javascript/util.js"></script>
<script type="text/javascript" src="javascript/admin/adminFunctions.js"></script>
<script type="text/javascript" src="javascript/admin/adminFunctionHandlers.js"></script>
<script type="text/javascript" src="javascript/training_planer.js"></script>

<!-- Importing a font from google api -->
<link href='http://fonts.googleapis.com/css?family=Varela+Round'
	rel='stylesheet' type='text/css'>

<link href="css/bootstrap-theme.min.css" rel="stylesheet"
	type="text/css">
<link href="css/bootstrap.min.css" rel="stylesheet" type="text/css">
<link rel="stylesheet" href="css/jquery-ui-1.10.4.custom.min.css"/>
<link rel='stylesheet' href='css/fullcalendar.css' />
<link href="css/tvm-volleyball.css" rel="stylesheet" type="text/css">
</head>
<body>
<?php
include "navbar.php";
?>


<div class="container">
    <div class="row">
		<div class="btn-group">
			<button type="button" class="btn btn-default" onclick="changeView('day');">
					Tag
				</button>
				<button type="button" class="btn btn-default" onclick="changeView('week');">
					Woche
				</button>
			<button type="button" class="btn btn-default" onclick="changeView('month');">
					Monat
				</button>
			</div>
        <div id="calendar" class="calendar">
			
        </div>
        <div id="comment"></div>
    </div>
</div>
	
	<div class="modal fade" id="modalNewExercise" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title">Neue Übung erstellen</h4>
      </div>
      <div class="modal-body" id="modalContent">
    	<form class="row" id="newExercise">
    		<div class="form-group col-xs-12 titleAutocompleteAppend">
    			<label for="titleField">Titel:</label>
    			<input id="titleField" name="titleField" class="form-control">
    		</div>
    		<div class="form-group col-xs-12">
    			<label for="descriptionField">Beschreibung:</label>
    			<textarea class="form-control" id="descriptionField" name="descriptionField" rows="5"></textarea>
    		</div>
    		<div class="form-group col-sm-4">
    			<label for="startTimeField">Von:</label>
    			<input type="time" id="startTimeField" name="startTimeField" class="form-control" value="19:00">
    		</div>
    		<div class="form-group col-sm-4">
    			<label for="endTimeField">bis:</label>
    			<input type="time" id="endTimeField" name="endTimeField" class="form-control" value="19:10">
    		</div>
    		<div class="form-group col-sm-4">
    			<label for="durationField">Dauer:</label>
    			<input id="durationField" name="durationField" class="form-control" value="10">
    		</div>
    	</form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Abbrechen</button>
        <button type="submit" class="btn btn-primary" data-dismiss="modal" id="submitNewExercise">Erstellen</button>
      </div>
    </div>
  </div>
</div>

<div id="removeNext"></div>
</html>