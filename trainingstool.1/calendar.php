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
	<script type="text/javascript" src="calendars/defaultCalendar.js"></script>

<!-- loading own libraries -->
<script type="text/javascript" src="javascript/util.js"></script>
<script type="text/javascript" src="javascript/admin/adminFunctions.js"></script>
<script type="text/javascript" src="javascript/admin/adminFunctionHandlers.js"></script>
<script type="text/javascript" src="javascript/calendar.js"></script>

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
		<!-- <div class="btn-group">
			<button type="button" class="btn btn-default" onclick="changeView('day');">
				Tag
			</button>
			<button type="button" class="btn btn-default" onclick="changeView('week');">
				Woche
			</button>
			<button type="button" class="btn btn-default" onclick="changeView('month');">
				Monat
			</button>
		</div>	-->
        <div id="calendar" class="calendar">
			
        </div>
        <div id="comment"></div>
    </div>
</div>

<div id="removeNext"></div>
</html>