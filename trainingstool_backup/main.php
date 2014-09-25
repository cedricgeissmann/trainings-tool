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

	
	
	<script src="http://maps.google.com/maps/api/js?sensor=true" type="text/javascript"></script>
	<script src="js/gmap/jquery.ui.map.full.min.js" type="text/javascript"></script>
	

<!-- loading third party libraries -->
<script src='js/moment.min.js'></script>
<script src='js/fullcalendar.min.js'></script>
<script type="text/javascript" src="js/json2html.js"></script>
<script type="text/javascript" src="js/md5.js"></script>
<script type="text/javascript" src="js/jquery.cookie.js"></script>


<!-- loading the transformations needed by json2html -->
<script type="text/javascript" src="transformation/mainTransforms/mainPanelTransform.js"></script>
<script type="text/javascript" src="transformation/passwordTransform.js"></script>
<script type="text/javascript" src="transformation/mainTransforms/teamFilterTransform.js"></script>
<script type="text/javascript" src="transformation/mainTransforms/notSubscribeTransformAdmin.js"></script>
<script type="text/javascript" src="transformation/mainTransforms/personTransform.js"></script>
<script type="text/javascript" src="transformation/mainTransforms/subscribeTransform.js"></script>
<script type="text/javascript" src="transformation/mainTransforms/subscribeTransformAdmin.js"></script>
<script type="text/javascript" src="transformation/mainTransforms/unsubscribeTransform.js"></script>
<script type="text/javascript" src="transformation/mainTransforms/unsubscribeTransformAdmin.js"></script>
<script type="text/javascript" src="transformation/mainTransforms/unsubscribeReasonTransform.js"></script>
<script type="text/javascript" src="transformation/mainTransforms/selectReasonTransform.js"></script>
<script type="text/javascript" src="transformation/profileTransforms/teamListTransform.js"></script>
<script type="text/javascript" src="transformation/divider.js"></script>
<script type="text/javascript" src="transformation/trainingNotificationTransforms/createTrainingNotificationTransform.js"></script>
<script type="text/javascript" src="transformation/trainingNotificationTransforms/trainingNotificationTransform.js"></script>
<script type="text/javascript" src="transformation/trainingNotificationTransforms/trainingNotificationInnerTransform.js"></script>

<script type="text/javascript" src="transformation/defaultNotification.js"></script>


<!-- loading own libraries -->
<script type="text/javascript" src="javascript/util.js"></script>
<script type="text/javascript" src="javascript/admin/adminFunctions.js"></script>
<script type="text/javascript" src="javascript/admin/adminFunctionHandlers.js"></script>
<script type="text/javascript" src="javascript/main.js"></script>

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


<div class="container">	<!--class="container"-->
    <div class="row row-fluid">
        <div class="col-sm-3 hidden-xs" id="navbar-side">
            <div class="bs-sidebar">
                <ul class="nav bs-sidenav" id="teamFilter">
                    <li class="dropdown-header"><h4>Team Filter</h4></li>
                    <li><a href="#" name="all" data-teamID="all">Alle</a>

                    </li>
                </ul>
                <hr>
                <ul class="nav bs-sidenav trainingOptions" id="trainerFunctions">
                	<li>
                		<a href="#" id="toggleNewEvent">Neues Ereignis erstellen</a>
                	</li>
                </ul>
            </div>
        </div>
        <div id="content" class="col-sm-9 onlyContentScroll">
            
        </div>
		<!--<div id="infoPanel" class="col-sm-2 hidden-xs" style="height: 500px;"></div>-->
        <div id="comment"></div>
    </div>
</div>
	
<div class="modal fade" id="modalNewGame" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 id="createNewEventTitle" class="modal-title">Neues Ereignis erstellen</h4>
      </div>
      <div class="modal-body" id="modalContent">
    	<form class="row" id="newEvent">
    		<div class="form-group col-xs-12">
    			<label for="typeField">Art des Ereignisses:</label>
    			<select id="typeField" name="typeField" class="form-control">
    				<option value="Training">Training</option>
    				<option value="Spiel">Spiel</option>
    				<option value="Turnier">Turnier</option>
    				<option value="Beach">Beach</option>
    				<option value="Sonstiges">Sonstiges</option>
    			</select>
    		</div>
    		<div class="form-group col-xs-12">
    			<label for="dateField">Datum:</label>
    			<input type="text" id="dateField" name="dateField" class="form-control datepicker">
    		</div>
    		<div class="form-group col-xs-12">
    			<label for="locationField">Ort:</label>
    			<input type="text" id="locationField" name="locationField" class="form-control">
    		</div>
    		<div class="form-group col-xs-12">
    			<label for="meetingPointField">Treffpunkt:</label>
    			<input type="text" id="meetingPointField" name="meetingPointField" class="form-control">
    		</div>
    		<div class="form-group col-xs-12">
    			<label for="enemyField">Gegner:</label>
    			<input type="text" id="enemyField" name="enemyField" class="form-control">
    		</div>
    		<div class="form-group col-xs-12">
    			<label for="teamField">Team:</label>
    			<select id="teamField" name="teamField" class="form-control">
    			</select>
    		</div>
    		<div class="form-group col-xs-6">
    			<label for="startTimeField">Von:</label>
    			<input type="time" id="startTimeField" name="startTimeField" class="form-control" value="12:00">
    		</div>
    		<div class="form-group col-xs-6">
    			<label for="endTimeField">bis:</label>
    			<input type="time" id="endTimeField" name="endTimeField" class="form-control" value="14:00">
    		</div>
    	</form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Abbrechen</button>
        <button id="createNewEventButton" type="submit" class="btn btn-primary" data-dismiss="modal">Erstellen</button>
      </div>
    </div>
  </div>
</div>

<div id="removeNext"></div>
</html>