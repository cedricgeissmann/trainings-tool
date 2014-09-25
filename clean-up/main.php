<?php
include 'init.php';
?>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width">

<script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>

<script type="text/javascript" src="js/json2html.js"></script>

<script type="text/javascript" src="javascript/main.js"></script>

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
        <div class="col-sm-3 hidden-xs">
            <div class="bs-sidebar" id="navbar-side">
                <ul class="nav bs-sidenav">
                    <li><a href="#" name="all">Alle</a>

                    </li>
                    <li><a href="#" name="herren">Herren</a>

                    </li>
                    <li><a href="#" name="u19">U19</a>

                    </li>
                    <li><a href="#" name="u17-1">U17-1</a>

                    </li>
                    <li><a href="#" name="u17-2">U17-2</a>

                    </li>
                </ul>
            </div>
        </div>
        <div id="content" class="col-sm-9">
            
        </div>
    </div>
</div>



<div id="removeNext"></div>
<!-- </body> -->

</body>
</html>