<?php
	include 'init.php';
?>
<!DOCTYPE html>
<html>
<head>
<?php 
	include 'head.php';
?>		
</head>

<body>
	<header>
		<h1>TVMuttenz Volleyball</h1>
	</header>

	<?php
		include "navbar.php";
		include 'Training.php';
	?>

	<div class="container">
	<div class="row">
		<div class="col-sm-3 bs-sidebar affix" role="complementary">
			<?php 
				echo Training::getSideNavbar();
			?>
		</div>
		<div class="col-sm-offset-2 col-sm-10" id="training">
		<?php 
			echo Training::getTraining();
		?>		
		</div>
	</div>
	</div>
	
	
	<div id="response"></div>
	<div id="comment"></div>

	<div class="modal fade" id="modalcedy" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h4 class="modal-title">Modal title</h4>
        </div>
        <div class="modal-body">
          ...
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
  </div>
	
<!-- </body> --></body>

</html>
