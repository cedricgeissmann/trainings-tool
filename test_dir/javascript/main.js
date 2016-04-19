var sidebarHandler = {
	selector : ".panel",
	dataSelector : "data-teamid",
	
	/**
	 * An object that holds 2 lists. a list with elements to be show and a list with elements that will be hidden.
	 */
	visibleObjectElement : function(toShow, toHide){
		this.toShow = toShow;
		this.toHide = toHide;
	},
	/**
 	 * Gets the selected team, and shows only contet of this team.
 	 * @param elem the element that triggers the event and holds the data for which team should be displayed.
 	 * 
 	 * Test: does not need a test, all components passed.
 	 */
	elementClicked: function(elem){
		var team = elem.data("teamid");
		this.setVisibility(this.selectShowHideElements(team));
	},
	/**
	 * Select the elements the will be show, and the elements that will be hidden.
	 * 
	 * Test: pass
	 */
	selectShowHideElements: function(teamID){
		var toShow = $(this.selector + this.buildDataSelector(teamID));
		var toHide = $(this.selector).not(this.buildDataSelector(teamID));
		if(teamID==="all"){
			toShow = $(this.selector);
			toHide = [];
		}
		return new this.visibleObjectElement(toShow, toHide);
	},
	/**
	 * Sets the visibility for the given VisibleObjectElement.
	 * 
	 * Test: does not need a test.
	 */
	setVisibility: function(elements){
		elements.toShow.show();
		elements.toHide.hide();
	},
	/**
	 * Builds the string used for the dataselector.
	 * 
	 * Test: pass
	 */
	buildDataSelector : function(team){
		return "[" + this.dataSelector+ "='"+team+"']";
	}
}

var subscription = {
	/**
	 * subscribe the current user, who triggers this event user from the training.
	 * @param id the id for the training for which the current user gets unsubscribed.
	 */
	 subscribe: function(id) {
		call_server_side_function("subscribeForTraining", "server/TrainingUtil.php", {trainingsID: id, subscribeType: 1}, function(){});
	},
	/**
	 * unsubscribe the current user, who triggers this event user from the training.
	 * @param id the id for the training for which the current user gets unsubscribed.
	 */
	 unsubscribe: function(id) {
		call_server_side_function("subscribeForTraining", "server/TrainingUtil.php", {trainingsID: id, subscribeType: 0}, function(){});
	},
	/**
	 * Moves a player to its corresponding list.
	 * @param playerName the name of the player who should be moved.
	 * @param element the element that is triggering the move event.
	 * @param subscribeListClass the class in which the player should be added.
	 */
	 movePlayer: function(playerName, element, subscribeListClass) {
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
		list.append(player);
	},
	move: {
		createMoveElement: function(){
			return new this.moveElement();
		}
	},
	moveElement: function(playerElement, moveToList){
		this.playerElement = playerElement;
		this.moveToList = moveToList;
	}
};



function adminActions(serverSideFunctionName, username, trainingsID, additionalData){
	var data = {
		username      : username,
		trainingsID   : trainingsID
	};
	$.extend(true, data, additionalData);
	call_server_side_function(serverSideFunctionName, "server/AdminUtil.php", data, function(){});
}


/**
 * This function is for the admin, to subscribe someone for a training.
 * @param username the username of the user that should be subscribed.
 * @param trainingsID the id of the training for which the user should be subscribed.
 */
function subscribeFromAdmin(username, trainingsID) {
	adminActions("subscribeForTrainingFromAdmin", username, trainingsID, {subscribeType: 1});
}

/**
 * This function is for the admin, to unsubscribe someone for a training.
 * @param username the username of the user that should be unsubscribed.
 * @param trainingsID the id of the training for which the user should be unsubscribed.
 */
function unsubscribeFromAdmin(username, trainingsID) {
	adminActions("subscribeForTrainingFromAdmin", username, trainingsID, {subscribeType: 0});
}

/**
 * This function is for the admin, to remove someone from a training.
 * @param username the username of the user that should be removed.
 * @param trainingsID the id of the training for which the user should be removed.
 */
function removeFromTrainingFromAdmin(username, trainingsID) {
	adminActions("removeFromTrainingFromAdmin", username, trainingsID, {subscribeType: 1});
}

/**
 * Admin can subscribe or unsubscribe a user for training by default.
 * @param username id of the user.
 * @param trainingsID id of the training used for default subscribe.
 * @param subscribeType 1 for subscribe, 0 for unsubscribe.
 */
function defaultSubscribeForTrainingFromAdmin(username, trainingsID, subscribeType) {
	adminActions("defaultSubscribeForTrainingFromAdmin", username, trainingsID, {subscribeType: subscribeType});
}

/**
 * Sets a training as deleted an removes it from the list.
 * @param id is the id of the training that will be deleted.
 */
function removeTraining(id) {
	call_server_side_function("removeTraining", "server/TrainingUtil.php", {id: id}, function(){});
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
	subscription.subscribe(id);
	getSessionsUsername(subscription.movePlayer, element, "subscribeList");
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
	subscription.unsubscribe(id);
	var name = getSessionsUsername();
	sendReason(id, name);
	name = removeLineBreaks(name);
	subscription.movePlayer(name, element, "unsubscribeList");
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
		subscription.unsubscribe(id);
		getSessionsUsername(subscription.movePlayer, element, "unsubscribeList");
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
	subscription.movePlayer(username, element, "subscribeList");
}

/**
 * Adds an eventhandler to the specified html element, which triggers the function to sign out a player for this training.
 * @param element the html element to which the handler gets attached.
 */
function signOutPlayerHandler(element){
	var id = element.data('trainingsid');
	var username = element.data('username');
	unsubscribeFromAdmin(username, id);
	subscription.movePlayer(username, element, "unsubscribeList");
}


/**
 * Adds an eventhandler to the specified html element, which triggers the function to remove a player for this training.
 * @param element the html element to which the handler gets attached.
 */
function removePlayerHandler(element){
	var id = element.data('trainingsid');
	var username = element.data('username');
	removeFromTrainingFromAdmin(username, id);
	subscription.movePlayer(username, element, "notSubscribedList");
}

/**
 * Adds an eventhandler to the specified html element, which triggers the function to sign up a player for each training of this type.
 * @param element the html element to which the handler gets attached.
 */
function signUpPlayerAlwaysHandler(element) {
	var id = element.data('trainingsid');
	var username = element.data('username');
	defaultSubscribeForTrainingFromAdmin(username, id, 1);
	subscription.movePlayer(username, element, "subscribeList");
}

/**
 * Adds an eventhandler to the specified html element, which triggers the function to sign out a player for each training of this type.
 * @param element the html element to which the handler gets attached.
 */
function signOutPlayerAlwaysHandler(element) {
	var id = element.data('trainingsid');
	var username = element.data('username');
	defaultSubscribeForTrainingFromAdmin(username, id, 0);
	subscription.movePlayer(username, element, "unsubscribeList");
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
	var data = {
		"id": trainingsID
	};
	//var res = json2html.transform(data, createTrainingNotificationTransform);
	var template = $("#trainingNotificationModalTemplate").html();
	var res = Mustache.render(template, data);
	if ($("#createTrainingNotificationModal").size() > 0) {
		$("#createTrainingNotificationModal").remove();
	}
	//$(res).insertBefore("#removeNext");
	$("#trainingNotificationAnchor").html(res);
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
		//console.log(data);
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
			renderPanel(data);
		}
	});
}

/**
 * Converts the JSON object into html elements and adds it to the page.
 * @param data a JSON object that contains the data of all trainings.
 */
function renderPanel(data){
	var template = $("#panelTemplate").html();
	var res = Mustache.render(template, data);
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
		var template = $("#teamFilterTemplate").html();
		var res = Mustache.render(template, filterData);
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
	addHandlerToElements("#teamFilter li a", "click", function(){sidebarHandler.elementClicked($(this));});
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
	var template = $("#teamListTemplate").html();
	var res = Mustache.render(template, teamListData);
	$("#teamField").html(res);
}

/**
 * The team filter menu is an off-canvas element. Toggle the menu to access it.
 */
function showTeamFilterMenu(){
	//console.log("foo");
	$(".offcanvas").offcanvas("toggle");
}


/**
 * Call this function to initialite the startup main view.
 */
function initMain(){
	loadPanelData();
	loadTeamFilterData();
	resizeArea("content");
	loadTeamListData();		//TODO: Load teamlist when needed
	//HERE
	addHandlerToElements(".nav-link", "click", function(){changeActiveTab($(this));});
	addHandlerToElements("#nav-profile", "click", function(){loadProfileData(renderProfileData);});
	addHandlerToElements("#nav-calendar", "click", function(){renderCalendar();});
	//addHandlerToElements("#nav-chat", "click", function(){prepareChatPanel();});
	addHandlerToElements("#offcanvas-toggler", "click", function(){showTeamFilterMenu();});
	addHandlerToElements("#nav-organizer", "click", function(){loadOrganizerData(renderOrganizerData);});
//	addRightSwipeHandler("#menu-dragger", showTeamFilterMenu);
}

/**
 * When document is loaded, call these functions.
 */
$("document").ready(function() {
	initMain();
});

/**
 * Loads the data that will be used to render the organizer from the server, and passes them to the renderCallback function.
 */
function loadOrganizerData(renderCallback){
	$.ajax({
		"type": "POST",
		"url": "server/AdminUtil.php",
		"data": {
			"function": "getOrganizerData"
		},
		"dataType": "json",
		"success": function(data){
			console.log(data);
			renderCallback(data);
		}
	});
}

/**
 * Renders the JSON-object, that contains the organizer data, to a valid html element, and adds it to the page.
 * @param data the JSON-object that holds the organizer data.
 */
 function renderOrganizerData(data){
 	var template = $("#organizerTemplate").html();
 	var res = Mustache.render(template, data);
 	$("#organizer").html(res);
 	addHandlerToElements("#createNewTeam", "click", function(){
		//TODO: Change data
		var notificationData = {
			data: {
				title: "Neues Team erstellen",
				id: "submitCreateNewTeam"
			}
		};
		displayTeamCreator(notificationData);
 	});
 	//$('#main').toggle("slide");
 }

function displayTeamCreator(data){
	var template = $("#notificationTemplate").html();
	var res = Mustache.render(template, data);
	$("#notification").html(res);
	addHandlerToElements("#submitCreateNewTeam", 'click', function(){
		var teamName = $("#newTeamName").val();
		createNewTeam(teamName);
	});
	$("#notification").modal("show");
}

/**
 * TODO: implement this function
 */
function createNewTeam(teamName){
	$.ajax({
		"type": "POST",
		"url": "server/AdminUtil.php",
		"data": {
			"teamName": teamName,
			"function": "createNewTeam"
		},
		"dataType": "json",
		"success": function(data){
			console.log(data);
		}
	});
}


/*----------------------------------------------------------------------------------------------------*/
//TODO

/**
 * Call this function to display the calendar.
 */
function renderCalendar(){
	$("#calendar").fullCalendar(defaultCalendar);
	//$('#main').hide("slide");
}

/**
 * Changes the content of the page to the selected active tab. Hide the previous active tab with a .hide("slide") and brings in the new active tab with .show("slide")
 * @param element the nav-bar element that is clicked.
 */
function changeActiveTab(element){
	var active = $(".activeTab");
	active.removeClass("activeTab");
	active.hide("slide");
	var contentIdentifier = element.data("identifier");
	var newContent = $("#"+contentIdentifier);
	newContent.show("slide");
	newContent.addClass("activeTab");
}

/**
 * Sets the content of the page to the selected active tab. Hide the previous active tab with a .hide("slide") and brings in the new active tab with .show("slide")
 * @param id the id of element that will be displayed.
 */
function setActiveTab(id){
	var active = $(".activeTab");
	active.removeClass("activeTab");
	active.hide("slide");
	var newContent = $("#"+id);
	newContent.show("slide");
	newContent.addClass("activeTab");
}

/**
 * Renders the JSON-object, that contains the profile data, to a valid html element, and adds is to the page.
 * @param data the JSON-object that holds the profile data.
 */
 function renderProfileData(data){
	 console.log(data);
 	var template = $("#profileTemplate").html();
 	var res = Mustache.render(template, data);
 	$("#profile").html(res);
 	selectUser();
 	addHandlerToElements("#userSelection", "change", function(){
 		storeItemToCache("profileUser", $(this).val(), 10);
 		loadProfileData(renderProfileData);
 	});
 	//$('#main').toggle("slide");
 }

/**
 * Changes the default selection in #userSelection to the value specified in the data-selected attribute.
 */
function selectUser(){
		var userSelection = $("#userSelection");
 	var selectedUser = userSelection.data("selected");
 	userSelection.val(selectedUser);
}


/**
 * Gets the profile data for e specific user from the server as JSON-object.
 * @param renderDataCallback the callback function that is used to render the data after receiving.
 */
function loadProfileData(renderDataCallback){
	var username = getItemFromCache("profileUser");
	if(username==null){
		getSessionsUsername(loadProfileDataCallback, renderDataCallback);
	}else{
		username = username.data;
		loadProfileDataCallback(username, renderDataCallback);
	}
	
}

function loadProfileDataCallback(username, renderDataCallback){
	$.ajax({
		"type": "POST",
		"url": "server/ProfileUtil.php",
		"data": {
			"username": username,
			"function": "getUserProfile"
		},
		"dataType": "json",
		"success": function(data){
			//console.log(data);
			renderDataCallback(data);
		}
	});
}


/**
 * Adds a right swipe handler to a specific element. When swipe is detected, execute the callback function.
 * @param selector the selector which identifies the elements to which the handler is added.
 * @param callback the callback function that is executed when the swipe is detected.
 */
function addRightSwipeHandler(selector, callback){
	$(selector).swipe({
  		swipeRight:function(event, direction, distance, duration, fingerCount) {
  			callback();
  		}
	});
}

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
