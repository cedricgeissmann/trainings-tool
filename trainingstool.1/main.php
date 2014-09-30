<?php include 'init.php'; ?>
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
  <script type="text/javascript" src="js/mustache.js"></script>
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
  <link href='http://fonts.googleapis.com/css?family=Varela+Round' rel='stylesheet' type='text/css'>

  <link href="css/bootstrap-theme.min.css" rel="stylesheet" type="text/css">
  <link href="css/bootstrap.min.css" rel="stylesheet" type="text/css">
  <link rel="stylesheet" href="css/jquery-ui-1.10.4.custom.min.css" />
  <link rel='stylesheet' href='css/fullcalendar.css' />
  <link href="css/tvm-volleyball.css" rel="stylesheet" type="text/css">
</head>

<body>
  <?php include "navbar.php"; ?>


  <div class="container">
    <!--class="container"-->
    <div class="row row-fluid">
      <div class="col-sm-3 hidden-xs" id="navbar-side">
        <div class="bs-sidebar">
          <ul class="nav bs-sidenav" id="teamFilter">
            <li class="dropdown-header">
              <h4>Team Filter</h4>
            </li>
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

  <!-- begin templates -->
  
  <script id="panelTemplate" type="x-tmpl-mustache">
          {{#panels}}

            <div class="panel panel-default team{{teamID}} {{type}}" data-teamid="{{teamID}}" data-id="{{id}}">
              <div class="panel-heading">
              
              
                {{! begin notification }}
                <span class="label label-primary notification col-xs-1" data-id="{{id}}">{{notifications.length}}</span>
                {{#notifications.length}}
                <div class="modal fade in notificationModal" style="display: none;" aria-hidden="false" data-trainings_id="{{id}}">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                        <h4 class="modal-title">Info</h4>
                      </div>
                      <div class="modal-body" id="trainingNotificationModalContent">
                        <ul class="list-group">
                          {{#notifications}}
                          <li class="list-group-item"><b>{{title}}</b>
                            
                            <button class="close deleteTrainingNotification {{#admin}}visibleAdmin{{/admin}} {{#trainer}}visibleTrainer{{/trainer}}" data-id="{{id}}">×</button>
                            
                            <div>{{message}}</div>
                          </li>
                          {{/notifications}}
                        </ul>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-dismiss="modal">Schliessen</button>
                      </div>
                    </div>
                  </div>
                </div>
                {{/notifications.length}}
                {{! end notification }}
                
                
                <h4 class="panel-title col-xs-10">{{type}}: {{day}} {{date}} {{time_start}} - {{time_end}}</h4>
                <div class="btn-group"><a href="#" class="dropdown-toggle {{#admin}}visibleAdmin{{/admin}} {{#trainer}}visibleTrainer{{/trainer}}" data-toggle="dropdown"><span class="glyphicon glyphicon-cog"></span><b class="caret"></b></a>
                  <ul class="dropdown-menu pull-right">
                    <li><a class="removeTraining {{#admin}}visibleAdmin{{/admin}} {{#trainer}}visibleTrainer{{/trainer}}" href="#!"  data-id="{{id}}">Training löschen</a>
                    </li>
                    <li><a class="addTrainingPlan {{#trainer}}visibleTrainer{{/trainer}}" href="#!" name="{{id}}" data-id="{{id}}">Traininplan bearbeiten</a>    {{!TODO: remove name}}
                    </li>
                    <li><a class="addTrainingNotification {{#admin}}visibleAdmin{{/admin}} {{#trainer}}visibleTrainer{{/trainer}}" href="#!" data-id="{{id}}">Benachrichtigung hinzufügen</a>
                    </li>
                    <li><a class="changeEvent {{#admin}}visibleAdmin{{/admin}} {{#trainer}}visibleTrainer{{/trainer}}" href="#!" data-id="{{id}}">Ereigniss bearbeiten</a>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div class="panel-body">
              <div class="numberDiv"><span>Anzahl Teilnehmer: </span><span data-id="{{id}}" class="numberOfPlayers">{{numberOfPlayers}}</span>
              </div>
              {{#location}}
              <div class="locationDiv"><span>Ort: </span><span class="locationSpan">{{location}}</span>
              </div>
              {{/location}}
              {{#enemy}}
              <div class="enemyDiv"><span>Gegner: </span><span class="enemySpan">{{enemy}}</span>
              </div>
              {{/enemy}}
              {{#meeting_point}}
              <div class="meetingPointDiv"><span>Treffpunkt: </span><span class="meetingPointSpan">{{meeting_point}}</span>
              </div>
              {{/meeting_point}}
              <div class="equidistant"><a href="#!" class="subscribe" data-id="{{id}}"><h2>Anmelden:</h2></a>
                <div data-id="{{id}}" class="subscribeList">
                  {{#subscribed}}
                  {{#adminOrTrainer}}
                  <div class="btn-group playerDropdownButton"><a name="{{username}}" href="#" class="dropdown-toggle" data-toggle="dropdown" data-username="{{username}}">{{firstname}} {{name}}<span></span><b class="caret"></b></a>
                    <ul class="dropdown-menu">
                      <li></li>
                      <li><a class="signUpPlayer" data-trainingsid="{{id}}" data-username="{{username}}" href="#!">Spieler anmelden</a>
                      </li>
                      <li><a class="signOutPlayer" data-trainingsid="{{id}}" data-username="{{username}}" href="#!">Spieler abmelden</a>
                      </li>
                      <li><a class="removePlayer" data-trainingsid="{{id}}" data-username="{{username}}" href="#!">Spieler entfernen</a>
                      </li>
                      <li><a class="signUpPlayerAlways" data-trainingsid="{{id}}" data-username="{{username}}" href="#!">Spieler immer anmelden</a>
                      </li>
                      <li><a class="signOutPlayerAlways" data-trainingsid="{{id}}" data-username="{{username}}" href="#!">Spieler immer abmelden</a>
                      </li>
                      <li class="divider"></li>
                      <li><a class="activate" data-trainingsid="{{id}}" data-username="{{username}}" href="#!">Freischalten</a>
                      </li>
                      <li><a class="deactivate" data-trainingsid="{{id}}" data-username="{{username}}" href="#!">Sperren</a>
                      </li>
                      <li><a class="grantTrainer" data-trainingsid="{{id}}" data-username="{{username}}" href="#!">Trainerrechte gewähren</a>
                      </li>
                      <li><a class="denyTrainer" data-trainingsid="{{id}}" data-username="{{username}}" href="#!">Trainerrechte verwerfen</a>
                      </li>
                      <li><a class="grantAdmin" data-trainingsid="{{id}}" data-username="{{username}}" href="#!">Adminrechte gewähren</a>
                      </li>
                      <li><a class="denyAdmin" data-trainingsid="{{id}}" data-username="{{username}}" href="#!">Adminrechte verwerfen</a>
                      </li>
                      <li class="divider"></li>
                      <li><a class="resetPassword" data-trainingsid="{{id}}" data-username="{{username}}" href="#!">Passwort zurücksetzen</a>
                      </li>
                      <li><a class="deletePlayer" data-trainingsid="{{id}}" data-username="{{username}}" href="#!">Spieler löschen</a>
                      </li>
                      <li><a class="editPlayer" data-trainingsid="{{id}}" data-username="{{username}}" href="#!">Spieler bearbeiten</a>
                      </li>
                    </ul>
                  </div>
                  {{/adminOrTrainer}}
                  {{^adminOrTrainer}}
                    <div>{{firstname}} {{name}}</div>
                  {{/adminOrTrainer}}
                  {{/subscribed}}
                  
                </div>
              </div>
              <div class="equidistant"><a href="#!" class="unsubscribe" data-id="{{id}}"><h2>Abmelden:</h2></a>
                <div data-id="{{id}}" class="unsubscribeList"></div>
                {{#unsubscribed}}
                {{#adminOrTrainer}}
                  <div class="btn-group playerDropdownButton"><a name="{{username}}" href="#" class="dropdown-toggle" data-toggle="dropdown" data-username="{{username}}">{{firstname}} {{name}}<span></span><b class="caret"></b></a>
                    <ul class="dropdown-menu">
                      <li></li>
                      <li><a class="signUpPlayer" data-trainingsid="{{id}}" data-username="{{username}}" href="#!">Spieler anmelden</a>
                      </li>
                      <li><a class="signOutPlayer" data-trainingsid="{{id}}" data-username="{{username}}" href="#!">Spieler abmelden</a>
                      </li>
                      <li><a class="removePlayer" data-trainingsid="{{id}}" data-username="{{username}}" href="#!">Spieler entfernen</a>
                      </li>
                      <li><a class="signUpPlayerAlways" data-trainingsid="{{id}}" data-username="{{username}}" href="#!">Spieler immer anmelden</a>
                      </li>
                      <li><a class="signOutPlayerAlways" data-trainingsid="{{id}}" data-username="{{username}}" href="#!">Spieler immer abmelden</a>
                      </li>
                      <li class="divider"></li>
                      <li><a class="activate" data-trainingsid="{{id}}" data-username="{{username}}" href="#!">Freischalten</a>
                      </li>
                      <li><a class="deactivate" data-trainingsid="{{id}}" data-username="{{username}}" href="#!">Sperren</a>
                      </li>
                      <li><a class="grantTrainer" data-trainingsid="{{id}}" data-username="{{username}}" href="#!">Trainerrechte gewähren</a>
                      </li>
                      <li><a class="denyTrainer" data-trainingsid="{{id}}" data-username="{{username}}" href="#!">Trainerrechte verwerfen</a>
                      </li>
                      <li><a class="grantAdmin" data-trainingsid="{{id}}" data-username="{{username}}" href="#!">Adminrechte gewähren</a>
                      </li>
                      <li><a class="denyAdmin" data-trainingsid="{{id}}" data-username="{{username}}" href="#!">Adminrechte verwerfen</a>
                      </li>
                      <li class="divider"></li>
                      <li><a class="resetPassword" data-trainingsid="{{id}}" data-username="{{username}}" href="#!">Passwort zurücksetzen</a>
                      </li>
                      <li><a class="deletePlayer" data-trainingsid="{{id}}" data-username="{{username}}" href="#!">Spieler löschen</a>
                      </li>
                      <li><a class="editPlayer" data-trainingsid="{{id}}" data-username="{{username}}" href="#!">Spieler bearbeiten</a>
                      </li>
                    </ul>
                  </div>
                  {{/adminOrTrainer}}
                  {{^adminOrTrainer}}
                    <div>{{firstname}} {{name}}</div>
                  {{/adminOrTrainer}}
                  {{/unsubscribed}}
              </div>
              <div class="equidistant {{#admin}}visibleAdmin{{/admin}} {{#trainer}}visibleTrainer{{/trainer}}"><a href="#!" data-id="{{id}}"><h2>Nicht gemeldet:</h2></a>
                <div data-id="{{id}}" class="notSubscribedList"></div>
                {{#notSubscribed}}
                {{#adminOrTrainer}}
                  <div class="btn-group playerDropdownButton"><a name="{{username}}" href="#" class="dropdown-toggle" data-toggle="dropdown" data-username="{{username}}">{{firstname}} {{name}}<span></span><b class="caret"></b></a>
                    <ul class="dropdown-menu">
                      <li></li>
                      <li><a class="signUpPlayer" data-trainingsid="{{id}}" data-username="{{username}}" href="#!">Spieler anmelden</a>
                      </li>
                      <li><a class="signOutPlayer" data-trainingsid="{{id}}" data-username="{{username}}" href="#!">Spieler abmelden</a>
                      </li>
                      <li><a class="removePlayer" data-trainingsid="{{id}}" data-username="{{username}}" href="#!">Spieler entfernen</a>
                      </li>
                      <li><a class="signUpPlayerAlways" data-trainingsid="{{id}}" data-username="{{username}}" href="#!">Spieler immer anmelden</a>
                      </li>
                      <li><a class="signOutPlayerAlways" data-trainingsid="{{id}}" data-username="{{username}}" href="#!">Spieler immer abmelden</a>
                      </li>
                      <li class="divider"></li>
                      <li><a class="activate" data-trainingsid="{{id}}" data-username="{{username}}" href="#!">Freischalten</a>
                      </li>
                      <li><a class="deactivate" data-trainingsid="{{id}}" data-username="{{username}}" href="#!">Sperren</a>
                      </li>
                      <li><a class="grantTrainer" data-trainingsid="{{id}}" data-username="{{username}}" href="#!">Trainerrechte gewähren</a>
                      </li>
                      <li><a class="denyTrainer" data-trainingsid="{{id}}" data-username="{{username}}" href="#!">Trainerrechte verwerfen</a>
                      </li>
                      <li><a class="grantAdmin" data-trainingsid="{{id}}" data-username="{{username}}" href="#!">Adminrechte gewähren</a>
                      </li>
                      <li><a class="denyAdmin" data-trainingsid="{{id}}" data-username="{{username}}" href="#!">Adminrechte verwerfen</a>
                      </li>
                      <li class="divider"></li>
                      <li><a class="resetPassword" data-trainingsid="{{id}}" data-username="{{username}}" href="#!">Passwort zurücksetzen</a>
                      </li>
                      <li><a class="deletePlayer" data-trainingsid="{{id}}" data-username="{{username}}" href="#!">Spieler löschen</a>
                      </li>
                      <li><a class="editPlayer" data-trainingsid="{{id}}" data-username="{{username}}" href="#!">Spieler bearbeiten</a>
                      </li>
                    </ul>
                  </div>
                  {{/adminOrTrainer}}
                  {{^adminOrTrainer}}
                    <div>{{firstname}} {{name}}</div>
                  {{/adminOrTrainer}}
                  {{/notSubscribed}}
              </div>
              
              </div>
              
              
            </div>

          {{/panels}}
        </script>
        
        <script id="teamFilterTemplate" type="x-tmpl-mustache">
          {{#teams.length}}
          <ul class="nav bs-sidenav" id="teamFilter">
            <li class="dropdown-header">
              <h4>Team Filter</h4>
            </li>
            <li><a href="#" name="all" data-teamid="all">Alle</a>
            </li>
            {{#teams}}
            <li><a href="#!" data-teamid="{{id}}">{{name}}</a>
            </li>
            {{/teams}}
          </ul>
          {{/teams.length}}
        </script>
  
  <!-- end templates -->


  <div id="removeNext"></div>

</html>