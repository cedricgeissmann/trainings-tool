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
            <li class="active" id="nav-home"><a href="#!" data-identifier="main" class="nav-link">Home</a>

            </li>
            <li id="nav-chat">
				<a href="chat.php"  data-identifier="chat" class="nav-link">Nachrichten <span class="badge" id="newMessageCounter">0</span></a>
				
            </li>
            <li id="nav-profile"><a href="#!"  data-identifier="profile" class="nav-link">Profil</a>

            </li>
            <li id="nav-trainer" class="visibleTrainer"><a href="trainer.php"  data-identifier="trainer" class="nav-link">Trainer</a>

            </li>
            <li id="nav-admin" class="visibleAdmin"><a href="admin.php"  data-identifier="admin" class="nav-link">Admin</a>

            </li>
			<li id="nav-attendanceCheck" class="visibleTrainer visibleAdmin">
				<a href="attendance_check.php"  data-identifier="attendance_check" class="nav-link">Anwesenheitskontrolle</a>
			</li>
			<li id="nav-calendar">
				<a href="#!"  data-identifier="calendar" class="nav-link">Kalender</a>
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