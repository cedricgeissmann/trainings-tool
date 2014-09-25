var traningsID = 0;

signUpPlayer = generateDropdownTransformEntry("Spieler anmelden", "signUpPlayer");

signUpPlayerAlways = generateDropdownTransformEntry("Spieler immer anmelden", "signUpPlayerAlways");

signOutPlayer = generateDropdownTransformEntry("Spieler abmelden", "signOutPlayer");

signOutPlayerAlways = generateDropdownTransformEntry("Spieler immer abmelden", "signOutPlayerAlways");

removePlayer = generateDropdownTransformEntry("Spieler entfernen", "removePlayer");

resetPassword = generateDropdownTransformEntry("Passwort zurücksetzen", "resetPassword");

deletePlayer = generateDropdownTransformEntry("Spieler löschen", "deletePlayer");

activatePlayer = generateDropdownTransformEntry("Freischalten", "activate");

deactivatePlayer = generateDropdownTransformEntry("Sperren", "deactivate");

grantTrainer = generateDropdownTransformEntry("Trainerrechte gewähren", "grantTrainer");

denyTrainer = generateDropdownTransformEntry("Trainerrechte verwerfen", "denyTrainer");

grantAdmin = generateDropdownTransformEntry("Adminrechte gewähren", "grantAdmin");

denyAdmin = generateDropdownTransformEntry("Adminrechte verwerfen", "denyAdmin");

editPlayer = generateDropdownTransformEntry("Spieler bearbeiten", "editPlayer");

var personTransformAdmin = {
	"tag": "div",
	"class": "btn-group playerDropdownButton",
	"children": [{
		"tag": "a",
		"html": "${firstname} ${name}",
		"name": "${username}",
		"href": "#",
		"class": "dropdown-toggle",
		"data-toggle": "dropdown",
		"children": [{
			"tag": "span"
		}, {
			"tag": "b",
			"class": "caret"
		}]
	}, {
		"tag": "ul",
		"class": "dropdown-menu",
		"children": [{
			"tag": "li",
			"children": [
				signUpPlayer,
				signOutPlayer,
				removePlayer,
				signUpPlayerAlways,
				signOutPlayerAlways,
				divider,
				activatePlayer,
				deactivatePlayer,
				grantTrainer,
				denyTrainer,
				grantAdmin,
				denyAdmin,
				divider,
				resetPassword,
				deletePlayer,
				editPlayer
			]
		}]
	}]
};


var tmpTransformation = {
	"tag": "ul",
	"class": "navbar-stacked",
	"children": [{
		"tag": "li",
		"children": [{
			"tag": "a",
			"class": "removeTraining",
			"href": "#!",
			"name": "${id}",
			"data-id": "${id}",
			"html": "Training löschen"
		}]
	}, {
		"tag": "li",
		"html": function() {
			return createTrainingsPlanEntry(this.id, this.type);
		}
	}, {
		"tag": "li",
		"children": [{
			"tag": "a",
			"class": "addTrainingNotification",
			"href": "#!",
			"data-id": "${id}",
			"html": "Benachrichtigung hinzufügen"
		}]
	}, {
		"tag": "li",
		"children": [{
			"tag": "a",
			"class": "changeEvent",
			"href": "#!",
			"data-id": "${id}",
			"html": "Ereigniss bearbeiten"
		}]
	}]
};


/**
 * Gets the selected team, and shows only contet of this team.
 * @param elem the element that triggers the event and holds the data for which team should be displayed.
 */
function sidebarHandler(elem){
	var team = elem.data("teamid");
	if (team === "all") {
		$(".panel").show();
	} else {
		$(".panel").hide();
		$(".panel[data-teamID='"+team+"']").show();
	}
}

/**
 * Moves a player to its corresponding list.
 * @param playerName the name of the player who should be moved.
 * @param element the element that is triggering the move event.
 * @param subscribeListClass the class in which the player should be added.
 */
function movePlayer(playerName, element, subscribeListClass) {
	var panel = element.closest(".panel-body");
	var list = panel.find("." + subscribeListClass);
	var player = panel.find("[name*='" + playerName + "']");
	var tagName = player.prop("tagName");
	if (tagName === "A") {
		player = player.parent();
	}
	if (player.size() === 0) {
		player = "<div name=" + playerName + ">" + getFullName(playerName) + "</div>";
	}
	//console.log(player);
	list.append(player);
}

/**
 * subscribe the current user, who triggers this event user from the training.
 * @param id the id for the training for which the current user gets unsubscribed.
 */
function subscribe(id) {
	$.ajax({
		"type": "POST",
		"url": "server/TrainingUtil.php",
		"data": {
			"trainingsID": id,
			"subscribeType": 1,
			"function": "subscribeForTraining"
		}
	});
}


/**
 * unsubscribe the current user, who triggers this event user from the training.
 * @param id the id for the training for which the current user gets unsubscribed.
 */
function unsubscribe(id) {
	$.ajax({
		"type": "POST",
		"url": "server/TrainingUtil.php",
		"data": {
			"trainingsID": id,
			"subscribeType": 0,
			"function": "subscribeForTraining"
		},
		"success": function(data){
			//console.log(data);
		}
	});
}

/**
 * This function is for the admin, to subscribe someone for a training.
 * @param username the username of the user that should be subscribed.
 * @param trainingsID the id of the training for which the user should be subscribed.
 */
function subscribeFromAdmin(username, trainingsID) {
	$.ajax({
		"type": "POST",
		"url": "server/AdminUtil.php",
		"data": {
			"username": username,
			"subscribeType": "1",
			"trainingsID": trainingsID,
			"function": "subscribeForTrainingFromAdmin"
		}
	});
}

/**
 * This function is for the admin, to unsubscribe someone for a training.
 * @param username the username of the user that should be unsubscribed.
 * @param trainingsID the id of the training for which the user should be unsubscribed.
 */
function unsubscribeFromAdmin(username, trainingsID) {
	$.ajax({
		"type": "POST",
		"url": "server/AdminUtil.php",
		"data": {
			"username": username,
			"subscribeType": "0",
			"trainingsID": trainingsID,
			"function": "subscribeForTrainingFromAdmin"
		}
	});
}

/**
 * This function is for the admin, to remove someone from a training.
 * @param username the username of the user that should be removed.
 * @param trainingsID the id of the training for which the user should be removed.
 */
function removeFromTrainingFromAdmin(username, trainingsID) {
	$.ajax({
		"type": "POST",
		"url": "server/AdminUtil.php",
		"data": {
			"username": username,
			"trainingsID": trainingsID,
			"function": "removeFromTrainingFromAdmin"
		}
	});
}

/**
 * Admin can subscribe or unsubscribe a user for training by default.
 * @param username id of the user.
 * @param trainingsID id of the training used for default subscribe.
 * @param subscribeType 1 for subscribe, 0 for unsubscribe.
 */
function defaultSubscribeForTrainingFromAdmin(username, trainingsID, subscribeType) {
	$.ajax({
		"type": "POST",
		"url": "server/AdminUtil.php",
		"data": {
			"username": username,
			"trainingsID": trainingsID,
			"subscribeType": subscribeType,
			"function": 'defaultSubscribeForTrainingFromAdmin'
		},
		"success": function(data) {
			//console.log(data);
		}
	});
}

/**
 * Sets a training as deleted an removes it from the list.
 * @param id is the id of the training that will be deleted.
 */
function removeTraining(id) {
	$.ajax({
		"type": "POST",
		"url": "server/TrainingUtil.php",
		"data": {
			"id": id,
			"function": "removeTraining"
		},
		"success": function(data) {
			//console.log(data);
		}
	});
}

/**
 * Adds an eventhandler to the specified html element, which triggers the function to set a training as deleted and removes it from the html page.
 * @param element the html element to which the handler gets attached.
 */
function removeTrainingHandler(element){
	var id = element.data("id");
	removeTraining(id);
	$(".panel[data-id=" + id+"]").remove();
}

/**
 * Adds an eventhandler to the specified html element, which triggers the function to add/modify the training plan for this training.
 * @param element the html element to which the handler gets attached.
 */
function addTrainingPlanHandler(element){
	var id = element.data("id");
	//localStorage.setItem("trainingID", id);
	var trainingsID = {"id": id};
	storeItemToCache("trainingPlanID", trainingsID, -1);
	window.location = "trainer.php";		//TODO: Don't change the page, just load the trainingplan template in #content.
}

/**
 * Adds an eventhandler to the specified html element, which triggers the function for a player to subscribe himself.
 * @param element the html element to which the handler gets attached.
 */
function subscribeHandler(element) {
	var id = element.data("id");
	subscribe(id);
	getSessionsUsername(movePlayer, element, "subscribeList");
}

/**
 * Adds all the handlers to the unsubscribe modal after this is rendered.
 * @param element the element that triggers the unsubscribeWithReasonHandler.
 */
function addUnsubscribeModalHandlers(element) {
	$("textarea").on("input", function() {
		resizeActiveTextArea($(this));
	});
	$("#unsubscribeWithReason").on("click", function() {
		unsubscribeWithReasonHandler(element);
	});
}

/**
 * Sends the reason to the server and adds it to the database.
 * @param trainingsID the id for which training the user sends the unsubscribe reason.
 * @param username the username of the user that sends the unsubscribe reason.
 */
function sendReason(trainingID, username) {
	var reasonType = $("#selectReason").val();
	var reason = $("#reasonField").val();
	$.ajax({
		"type": "POST",
		"url": "server/TrainingUtil.php",
		"data": {
			"trainingID": trainingID,
			"username": username,
			"reasonType": reasonType,
			"reason": reason,
			"function": "addReason"
		},
		"success": function(data) {
			//console.log(data);
		}
	});
}

/**
 * Adds an eventhandler to the html element that triggers the unsubscription for the active player with the specified reason.
 * @param element the html element that is triggered.
 */
function unsubscribeWithReasonHandler(element) {
	var id = element.data("id");
	unsubscribe(id);
	var name = getSessionsUsername();
	sendReason(id, name);
	name = removeLineBreaks(name);
	movePlayer(name, element, "unsubscribeList");
}

/**
 * Gets all available reasons to unsubribe from a training from the server, and renders them to a html select group. Appends this group to the specified html element.
 * @param element the html element on which the select data is appended to.
 */
function addSelectReasonValues(element) {
	$.ajax({
		"type": "POST",
		"url": "server/TrainingUtil.php",
		"async": false,		//TODO change this to async: true if possible. This must not be async, because you have to wait for a single loading of this dialog to continue.
		"data": {
			"function": "getReasons"
		},
		"dataType": "json",
		"success": function(selectReasonData) {
			var res = json2html.transform(selectReasonData, selectReasonTransform);
			element.append(res);
		}
	});
}

/**
 * TODO: need_reason modal with mustache
 * Adds an eventhandler to the specified html element, which triggers the function for a player to unsubscribe himself.
 * @param element the html element to which the handler gets attached.
 */
function unsubscribeHandler(element){
	var id = element.data("id");
	var need_reason = element.data("need_reason");
	if (need_reason === 1) {		//TODO get the need_reason in the training data.
		//TODO create unsubscribe modal
		var unsubscribeReason = {
			"id": id
		};
		if ($("#unsubscribeReasonModal").size() === 0) {
			var res = json2html.transform(unsubscribeReason, unsubscribeReasonTransform);
			$(res).insertBefore("#removeNext");
			addSelectReasonValues($("#selectReason"));
			addUnsubscribeModalHandlers(element);
		}
		$("#unsubscribeReasonModal").modal("toggle");
	} else {
		unsubscribe(id);
		getSessionsUsername(movePlayer, element, "unsubscribeList");
	}
}

/**
 * Adds an eventhandler to the specified html element, which triggers the function to sign up a player for this training.
 * @param element the html element to which the handler gets attached.
 */
function signUpPlayerHandler(element) {
	var id = element.data('trainingsid');
	var username = element.data('username');
	subscribeFromAdmin(username, id);
	movePlayer(username, element, "subscribeList");
}

/**
 * Adds an eventhandler to the specified html element, which triggers the function to sign out a player for this training.
 * @param element the html element to which the handler gets attached.
 */
function signOutPlayerHandler(element){
	var id = element.data('trainingsid');
	var username = element.data('username');
	unsubscribeFromAdmin(username, id);
	movePlayer(username, element, "unsubscribeList");
}


/**
 * Adds an eventhandler to the specified html element, which triggers the function to remove a player for this training.
 * @param element the html element to which the handler gets attached.
 */
function removePlayerHandler(element){
	var id = element.data('trainingsid');
	var username = element.data('username');
	removeFromTrainingFromAdmin(username, id);
	movePlayer(username, element, "notSubscribedList");
}

/**
 * Adds an eventhandler to the specified html element, which triggers the function to sign up a player for each training of this type.
 * @param element the html element to which the handler gets attached.
 */
function signUpPlayerAlwaysHandler(element) {
	var id = element.data('trainingsid');
	var username = element.data('username');
	defaultSubscribeForTrainingFromAdmin(username, id, 1);
	movePlayer(username, element, "subscribeList");
}

/**
 * Adds an eventhandler to the specified html element, which triggers the function to sign out a player for each training of this type.
 * @param element the html element to which the handler gets attached.
 */
function signOutPlayerAlwaysHandler(element) {
	var id = element.data('trainingsid');
	var username = element.data('username');
	defaultSubscribeForTrainingFromAdmin(username, id, 0);
	movePlayer(username, element, "unsubscribeList");
}

/**
 * Toggles the modal that contains the notifications for this element.
 * @param elem the triggering html element. This element needs the data attribute id.
 */
function displayNotification(elem) {
	var id = elem.data("id");
	$(".notificationModal[data-trainings_id="+id+"]").modal("toggle");
}

/**
 * Adds an eventhandler to the specified element. The handler adds a new notification to the training when triggered.
 * @param elem the html element to which the handler gets attached.
 */
function sendTrainingNotificationHandler(elem) {
	var element = $(elem);
	var id = element.data("id");
	var notificationTitle = $("#trainingNotificationTitleField").val();
	var notificationContent = $("#trainingNotificationContentField").val();
	$.ajax({
		"type": "POST",
		"url": "server/TrainingUtil.php",
		"data": {
			"trainingsID": id,
			"notificationTitle": notificationTitle,
			"notificationContent": notificationContent,
			"function": "addTrainingNotification"
		}
	});
	//location.reload();		//TODO update notification counter in his own thread
	notifyUser("Die Benachrichtigung wurde auf dem Server gespeichert. Um den aktuellen stand zu sehen, muss die Seite neu geladen werden.<br><a href='main.php'>Seite neu laden</a>");
}


/**
 * Adds an eventhandler to element specified as parameter.
 * @param elem the html element to which the handler gets attached.
 */
function addTrainingNotificationHandler(element) {
	var trainingsID = element.data("id");
	var data = [{
		"id": trainingsID
	}];
	var res = json2html.transform(data, createTrainingNotificationTransform);
	if ($("#createTrainingNotificationModal").size() > 0) {
		$("#createTrainingNotificationModal").remove();
	}
	$(res).insertBefore("#removeNext");
	$("#createTrainingNotificationModal").modal("toggle");
	$("#sendTrainingNotification").on("click", function() {
		sendTrainingNotificationHandler(this);
	});
	$("textarea").on("input", function() {
		resizeActiveTextArea($(this));
	});
}

/**
 * Loads a training with the specified id, and hands the data as json to the callback.
 * @param id is the id of the training.
 * @param callback the function to with the result is handed over.
 */
function loadTrainingByIDWithCallback(id, callback) {
	$.ajax({
		"type": "POST",
		"url": "server/TrainingUtil.php",
		"data": {
			"trainingsID": id,
			"function": "loadTrainingById"
		},
		"dataType": "json",
		"success": function(data) {
			//console.log(data);
			callback(data);
		}
	});
}


/**
 * Sends the new event data to the server, that stores the new data in the databse.
 * @param id is the id of the event that is updated.
 */
function updateEvent(id) {
	$.ajax({
		"type": "POST",
		"url": "server/TrainingUtil.php",
		"data": $("#newEvent").serialize() + "&trainingsID=" + id + "&function=updateEvent",
		"dataType": "json",
		"success": function(data) {
			//console.log(data);	//TODO update event on client side.
			notifyUser("Ein Ereignis wurde geändert. Klicke <a href='main.php'>hier</a> um zu aktualisieren.");
		}
	});
}


/**
 * Changes the modal new game, to update an event. Inserts the entries of the selected event. Makes changes to the appearence of the modal, displays the model when all changes are applied.
 * @param data a json array that holds the data of the accessed training.
 */
function updateModalNewGame(trainingData) {
	trainingData = trainingData[0];		//Take only the first element of the array, because the is only one entry in the array, due to id comparision.
	$("#typeField").val(trainingData.type);
	$("#dateField").val(trainingData.date);
	$("#locationField").val(trainingData.location);
	$("#meetingPointField").val(trainingData.meeting_point);
	$("#teamField").val(trainingData.teamID);
	$("#startTimeField").val(trainingData.time_start);
	$("#endTimeField").val(trainingData.time_end);
	$("#createNewEventButton").unbind("click");
	$("#createNewEventButton").on("click", function() {
		updateEvent(trainingData.id);
	});
	$("#createNewEventTitle").html("Ereignis aktualisieren");
	$("#createNewEventButton").html("Aktualisieren");
	$("#modalNewGame").modal("toggle");
}

/**
 * Handler which is called when an event should be updated. Get the actual data from the server and hands it to the updateModalNewGame function, that displays these data.
 * @param element this is the element that triggers the event. The element needs the data attribute "id" that holds the trainingsID.
 */
function loadChangeEventHandler(element) {
	var id = element.data("id");
	loadTrainingByIDWithCallback(id, function(data) {
		console.log(data);
		updateModalNewGame(data);
	});
}

/**
 * Updates the newEventModal to bind the new event handler and change its appearance to fit the new event. After making the changes, displays the modal.
 */
function loadNewEventModalHandler() {
	$("#createNewEventButton").unbind("click");
	$("#createNewEventButton").on("click", function() {
		createNewEvent();
	});
	$("#createNewEventTitle").html("Neues Ereignis erstellen");
	$("#createNewEventButton").html("Erstellen");
	$("#modalNewGame").modal("toggle");
}

/**
 * Resize the main panel if the window changes size.
 */
$(window).on("resize", function() {
	resizeArea("content");
});

/**
 * Loads the information for all trainings and hands the JSON data to a render callback function.
 */
function loadPanelData(){
	//TODO	change to dataType: json, remove console.log
	$.ajax({
		"type": "POST",
		"url": "server/TrainingUtil.php",
		"data": {
			"function": "getTraining"
		},
		//"dataType": "json",
		"success": function(data) {
			data = jQuery.parseJSON(data);
			console.log(data);
			renderPanel(data);
		}
	});
}

/**
 * Converts the JSON object into html elements and adds it to the page.
 * @param data a JSON object that contains the data of all trainings.
 */
function renderPanel(data){
	var transform = $("#panelTemplate").html();
	var res = Mustache.render(transform, data);
	$("#content").html(res);
	//Call here functions that have to be executed after the training panels are rendered.
	addTrainingPanelHandlers();
	addParticipantsHandlers();
	customizePanels();
	checkAdminAndTrainerWithCallback(setVisibilities);
}

/**
 * Loads the data to create the team filter. Hands the data to the render function.
 */
function loadTeamFilterData() {
	$.ajax({
		"type": "POST",
		"url": "server/TrainingUtil.php",
		"data": {
			"function": "getTeamFilter"
		},
		//"dataType": "json",
		"success": function(data) {
			data = jQuery.parseJSON(data);
			console.log(data);
			renderTeamFilter(data);
		}
	});
}

/**
 * Renders the JSON object into a html element and adds it to the page.
 * @param filterData is a JSON object that contains all the data that is needed to create the team filter.
 */
function renderTeamFilter(filterData){
	//if (filterData.length >= 2) {
		//var res = json2html.transform(filterData, teamFilterTransform);		//HERE actually
		var transform = $("#teamFilterTemplate").html();
		var res = Mustache.render(transform, filterData);
		console.log(res);
		$("#teamFilter").html(res);
		addSidebarHandlers();
	//} else{
	//	checkAdminAndTrainerWithCallback(removeTeamFilterNavbar);
	//}
}

/**
 * Remove left navbar if user is neighter admin nor trainer.
 * @param args array with arguments that are given to callback function.
 * @param data JSON object that holds admin and trainer information.
 */
function removeTeamFilterNavbar(args, data){
	if(data.admin==0 && data.trainer==0){
		$("#navbar-side").remove();
		$("#content").toggleClass("col-sm-9");
		$("#content").toggleClass("col-sm-12");
	}
}

/**
 * Sends the data for the new event to the server, to store a new training type in the database. Gets the data of the #newEvent-form, and serializes it to a POST request.
 */
function createNewEvent() {
	$.ajax({
		"type": "POST",
		"url": "server/TrainingUtil.php",
		"data": $("#newEvent").serialize() + "&function=createNewEvent",
		"success": function(data) {
			//console.log(data);
		}
	});
}


/**
 * Adds all the sidebar handlers, after the sidebar is loaded.
 */
function addSidebarHandlers(){
	addHandlerToElements("#teamFilter li a", "click", function(){sidebarHandler($(this));});
	addHandlerToElements("#toggleNewEvent", "click", loadNewEventModalHandler);
}

/**
 * Adds all the handlers to the training panel, after the panel is loaded.
 */
function addTrainingPanelHandlers(){
	addHandlerToElements(".subscribe", "click", function(){subscribeHandler($(this));});
	addHandlerToElements(".unsubscribe", "click", function(){unsubscribeHandler($(this));});
	addHandlerToElements(".removeTraining", "click", function(){removeTrainingHandler($(this));});
	addHandlerToElements(".addTrainingPlan", "click", function(){addTrainingPlanHandler($(this));});
	addHandlerToElements(".addTrainingNotification", "click", function() {addTrainingNotificationHandler($(this));});
	addHandlerToElements(".notification", "click", function(){displayNotification($(this));});		//Deactivate, beause this is set after adding the notification data to the labels.	//HERE add the notification element to the panels-JSON
	addHandlerToElements(".changeEvent", "click", function() {loadChangeEventHandler($(this));});
}

/**
 * Adds all the handlers to the dropdown menu of a participant.
 */
function addParticipantsHandlers(){
	addHandlerToElements(".signUpPlayer", "click", function(){signUpPlayerHandler($(this));});
	addHandlerToElements(".signOutPlayer", "click", function(){signOutPlayerHandler($(this));});
	addHandlerToElements(".removePlayer", "click", function(){removePlayerHandler($(this));});
	addHandlerToElements(".signUpPlayerAlways", "click", function(){signUpPlayerAlwaysHandler($(this));});
	addHandlerToElements(".signOutPlayerAlways", "click", function(){signOutPlayerAlwaysHandler($(this));});
	addHandlerToElements(".activate", "click", function(){activatePlayerHandler($(this));});
	addHandlerToElements(".deactivate", "click", function(){deactivatePlayerHandler($(this));});
	addHandlerToElements(".grantTrainer", "click", function(){grantTrainerHandler($(this));});
	addHandlerToElements(".denyTrainer", "click", function(){denyTrainerHandler($(this));});
	addHandlerToElements(".grantAdmin", "click", function(){grantAdminHandler($(this));});
	addHandlerToElements(".denyAdmin", "click", function(){denyAdminHandler($(this));});
	addHandlerToElements(".resetPassword", "click", function(){resetPasswordHandler($(this));});
	addHandlerToElements(".deletePlayer", "click", function(){deleteUserHandler($(this));});
	addHandlerToElements(".editPlayer", "click", function(){editPlayerHandler($(this));});
}

/**
 * TODO: Team list in createNewEventModal. Distinct teams. Rename. Docu.
 * Loads a list of teams in which the user is admin or trainer. Appends this list to the team selection in new event creation.
 */
function loadTeamListData() {
	$.ajax({
		"type": "POST",
		"url": "server/ProfileUtil.php",
		"data": {
			"function": "getTeamListForAdmin"
		},
		"dataType": "json",
		"success": function(data) {
			renderTeamList(data);
		}
	});
}

/**
 * Transforms a JSON object into a html and adds it to the list of teams.
 * @param teamListData is a JSON object that holds all the teams which are appended to the list.
 */
function renderTeamList(teamListData){
	var res = json2html.transform(teamListData, teamListTransform);
	$("#teamField").html(res);
}


/**
 * Gets all the notifications for a training with specified id and calls the render notification function.
 * @param trainingsID identifies the training for which the notifications are loaded.
 * @param elem is the html element that triggers the event.
 */
/*function loadNotificationListData(elem){
	$.ajax({
		"type": "POST",
		"url": "server/TrainingUtil.php",
		"data": {
			"trainingsID": elem.data("id"),
			"function": "loadNotificationListData"
		},
		"dataType": "json",
		"success": function(data){
			renderNotificationList(data, elem);
		}
	});
}*/

/**
 * Transforms the JSON object into a html element and adds the element the notification label.
 * @param notifications the JSON object which is rendered to the html element.
 * @param elem the parent element which gets the notifications added, an on click handler attached and a notification count.
 */
/*function renderNotificationList(notifications, elem) {
	elem.data("notification", notifications);
	elem.html(notifications.length);
	elem.on("click", function(){
		displayNotification($(this));
	});
}*/

/**
 * Renders the notificatin data array into a html list and returns it to its parrent.
 * @param notificatins a json object that holds a list of the notifications.
 * @returns a list of html elements that contains the notifications
 */
/*function renderTrainingNotifications(notifications){
	var res = json2html.transform(notifications, trainingNotificationInnerTransform);
	return res;
}*/

/**
 * Renders a JSON object that contains data of a user to a html element, and adds it to the page. Desides if admin or trainer functions are added or not.
 * @param args list with two elements. The first is a list of persons, the second is the parent element, on which the data will be appended and the third is the trainingsID.
 * @param data json object that contains the information for admin and trainer.
 */
/*function renderPersonListCallback(args, data){
	var listData = args[0];
	var elem = args[1];
	var res = "";
	jQuery.each(listData, function(i, obj){
		obj.trainingsID = args[2];			//TODO: Maybe do this on the server (via SELECT trainingsID INNER JOIN training WHERE id='$trainingsID') to improve performance.
	});
	if(data.admin==1 || data.trainer==1){
		res = json2html.transform(listData, personTransformAdmin);
		elem.append(res);
		addParticipantsHandlers();
	}else{
		res = json2html.transform(listData, personTransform);
		elem.append(res);
	}
	
}*/


/**
 * Gets a list of all participants for a training for a specific subscribe type.
 * @param id the id of the training for which the participant list is generated.
 * @param subscribeType determines if the list is for subscribed (1), unsubscribed (0) or not subscribed (-1) participants.
 * @param elem defines the html element, where the list is appended to.
 */
/*function getPersonList(id, subscribeType, elem){
	$.ajax({
		"type": "POST",
		"url": "server/TrainingUtil.php",
		"data": {
			"trainingsID": id,
			"subscribeType": subscribeType,
			"function": "getPersonList"
		},
		"dataType": "json",
		"success": function(data){
			checkAdminAndTrainerWithCallback(renderPersonListCallback, data, elem, id);
		}
		
	});
}*/

/**
 * When document is loaded, call these functions.
 */
$("document").ready(function() {
	loadPanelData();
	loadTeamFilterData();
	resizeArea("content");
	loadTeamListData();		//TODO: Load teamlist when needed
	//HERE
});



/*----------------------------------------------------------------------------------------------------*/
//TODO

/**
 * TODO: Outsource in function.
 * Load color properties from the cookies and change appearence of the panel.
 */
function customizePanels() {
	var trainingColor = $.cookie("Training");
	if (trainingColor !== undefined) {
		$(".Training").removeClass("panel-default");
		$(".Training > .panel-heading").css({
			"background-color": trainingColor
		});
		$(".Training").css({
			"border": trainingColor + " solid 1px"
		});
	}
	var matchColor = $.cookie("Spiel");
	if (matchColor !== undefined) {
		$(".Spiel").removeClass("panel-default");
		$(".Spiel > .panel-heading").css({
			"background-color": matchColor
		});
		$(".Spiel").css({
			"border": matchColor + " solid 1px"
		});
	}
	var tournamentColor = $.cookie("Turnier");
	if (tournamentColor !== undefined) {
		$(".Turnier").removeClass("panel-default");
		$(".Turnier > .panel-heading").css({
			"background-color": tournamentColor
		});
		$(".Turnier").css({
			"border": tournamentColor + " solid 1px"
		});
	}
	var beachColor = $.cookie("Beach");
	if (beachColor !== undefined) {
		$(".Beach").removeClass("panel-default");
		$(".Beach > .panel-heading").css({
			"background-color": beachColor
		});
		$(".Beach").css({
			"border": beachColor + " solid 1px"
		});
	}
	var divColor = $.cookie("Sonstiges");
	if (divColor !== undefined) {
		$(".Sonstiges").removeClass("panel-default");
		$(".Sonstiges > .panel-heading").css({
			"background-color": divColor
		});
		$(".Sonstiges").css({
			"border": divColor + " solid 1px"
		});
	}
}


/**
 * TODO: deactivate these functions.
 *
function renderPersons(persons, admin) {
	var res = "";
	if (admin == 1) {
		res = json2html.transform(persons, personTransformAdmin);
	} else {
		res = json2html.transform(persons, personTransform);
	}
	return res;
}

function updateTrainingsID(id) {
	trainingsID = id;
}

function renderSubscribed(persons, admin) {
	if (admin == 1) {
		updateTrainingsID(persons.id);
		return json2html.transform(persons, subscribeTransformAdmin);
	} else {
		return json2html.transform(persons, subscribeTransform);
	}
}

function renderUnsubscribed(persons, admin) {
	if (admin == 1) {
		updateTrainingsID(persons.id);
		return json2html.transform(persons, unsubscribeTransformAdmin);
	} else {
		return json2html.transform(persons, unsubscribeTransform);
	}
}

function renderNotSubscribed(persons, admin) {
	if (admin == 1) {
		updateTrainingsID(persons.id);
		return json2html.transform(persons, notSubscribeTransformAdmin);
	}
}

/**
 * Creates a dropdown entry to manage the trainings plan.
 * @param id is the id of the training for which the entry is created.
 * @param type specifies the type of the event. Currently only for the type "Training" is an entry created.
 *
function createTrainingsPlanEntry(id, type) {
	console.log("i'm used");
	if (type === "Training") {
		return "<a href='#!' name='" + id + "' data-id='" + id + "' class='addTrainingPlan'>Trainingsplan hinzufügen</a>";
	} else {
		return "";
	}
}
*/