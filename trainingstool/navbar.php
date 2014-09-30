<nav class="navbar navbar-default navbar-fixed-top" role="navigation">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-head"> <span class="sr-only">Toggle navigation</span>
 <span class="icon-bar"></span>
 <span class="icon-bar"></span>
 <span class="icon-bar"></span>

        </button> <a class="navbar-brand" href="main.php">TV Muttenz</a>

    </div>
    <div class="collapse navbar-collapse" id="navbar-head">
        <ul class="nav navbar-nav">
            <li class="active" id="nav-home"><a href="main.php">Home</a>

            </li>
            <li id="nav-chat">
				<a href="chat.php">Nachrichten <span class="badge" id="newMessageCounter">0</span></a>
				
            </li>
            <li id="nav-profile"><a href="#!">Profil</a>

            </li>
            <li id="nav-trainer" class="visibleTrainer"><a href="trainer.php">Trainer</a>

            </li>
            <li id="nav-admin" class="visibleAdmin"><a href="admin.php">Admin</a>

            </li>
			<li id="nav-attendanceCheck" class="visibleTrainer visibleAdmin">
				<a href="attendance_check.php">Anwesenheitskontrolle</a>
			</li>
			<li id="nav-calendar">
				<a href="#!">Kalender</a>
			</li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
        	<li>
        		<a id="logout" href="logout.php">Abmelden</a>
        	</li>
        </ul>
    </div>
</nav>

<script type="text/javascript" src="javascript/navbar.js"></script>