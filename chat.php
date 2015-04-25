<?php
include 'init.php';
?>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />

<script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>


<!-- loading third party libraries -->
<script type="text/javascript" src="js/json2html.js"></script>
<script type="text/javascript" src="js/md5.js"></script>


<!-- loading the transformations needed by json2html -->
<script type="text/javascript" src="transformation/chatTransform/contactListTransform.js"></script>
<script type="text/javascript" src="transformation/chatTransform/conversationTransform.js"></script>

<script type="text/javascript" src="transformation/defaultNotification.js"></script>


<!-- loading own libraries -->
<script type="text/javascript" src="javascript/util.js"></script>
<script type="text/javascript" src="javascript/chat.js"></script>

<!-- Importing a font from google api -->
<link href='http://fonts.googleapis.com/css?family=Varela+Round'
	rel='stylesheet' type='text/css'>

<link href="css/bootstrap-theme.min.css" rel="stylesheet"
	type="text/css">
<link href="css/bootstrap.min.css" rel="stylesheet" type="text/css">
<link href="css/tvm-volleyball.css" rel="stylesheet" type="text/css">
</head>
<body>
<?php
include "navbar.php";
?>


<div class="container">
    <div class="row">
        <div class="col-sm-3" id="navbar-side">
            <div class="bs-sidebar">
                <ul class="nav bs-sidenav" id="contactListHeader">
                    <li class="dropdown-header"><h4>Kontakte</h4></li>
                    
                </ul>
                <ul class="nav bs-sidenav" id="contactList"> 
                </ul>
            </div>
        </div>
        <div id="content" class="col-sm-9 chatContent">
            <!--<div id="conversationArea">
            	<p class="notificationCenter">Keine Konversation geladen...</p>
            </div>
            <div id="chatInputField" class="input-group">
           		<textarea id="messageInputField" class="form-control"></textarea>
           		<span class="input-group-btn">
           			<button class="btn btn-default" type="button" onclick="sendMessage()">Senden</button>
           		</span>
            </div>-->
            <div class="panel panel-default" id="chatPanel">
            	<div class="panel-heading" id="chatHeading">
            		Chat
            	</div>
            	<div class="panel-body" id="conversationArea">
            		
            	</div>
            	<div class="panel-footer" id="chatPanelFooter">
            		<div id="chatInputField" class="input-group">
           		<textarea id="messageInputField" class="form-control"></textarea>
           		<span class="input-group-btn">
           			<button class="btn btn-default" type="button" onclick="sendMessage()">Senden</button>
           		</span>
            </div>
            	</div>
            </div>
        </div>
        <div id="comment"></div>
    </div>
</div>


<div id="removeNext"></div>
</html>