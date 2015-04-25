<?php
    session_start();
    $_SESSION["login"]=1;
?>

<html>
<head>
  <meta charset="utf-8">
  <title>QUnit test for main.php and main.js</title>
  <base href="/">
  <link rel="stylesheet" href="//code.jquery.com/qunit/qunit-1.18.0.css">
   <script src="//code.jquery.com/qunit/qunit-1.18.0.js"></script>
   
</head>
<body>
  <div id="qunit"></div>
  <div id="qunit-fixture">
      
      <?php include("../main.php") ?>
      
  </div>
  
  
  <script src="test/testMain.js"></script>
  
  
</body>
</html>