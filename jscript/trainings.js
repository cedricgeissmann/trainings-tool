


define(["js/render", "js/remotecall", "js/util", "lib/bootstrap"], function(render, rc, util){



var subscription = {
	/**
	 * subscribe the current user, who triggers this event user from the training.
	 * @param id the id for the training for which the current user gets unsubscribed.
	 */
	subscribe: function(id) {
		rc.call_server_side_function("TrainingUtil", "subscribeForTraining", {trainingsID: id, subscribeType: 1}, function(){});
	},
	/**
	 * unsubscribe the current user, who triggers this event user from the training.
	 * @param id the id for the training for which the current user gets unsubscribed.
	 */
	unsubscribe: function(id) {
		rc.call_server_side_function("TrainingUtil", "subscribeForTraining", {trainingsID: id, subscribeType: 0}, function(){});
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
	rc.call_server_side_function("AdminUtil", serverSideFunctionName, data, function(){});
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
	rc.call_server_side_function("TrainingUtil", "removeTraining", {id: id}, function(){});
}

/**
 * Adds an eventhandler to the specified html element, which triggers the function for a player to subscribe himself.
 * @param element the html element to which the handler gets attached.
 */
function subscribeHandler(element) {
	var id = element.data("id");
	subscription.subscribe(id);
	//getSessionsUsername(subscription.movePlayer, element, "subscribeList");
}

/**
 * Adds an eventhandler to the specified html element, which triggers the function for a player to unsubscribe himself.
 * @param element the html element to which the handler gets attached.
 */
function unsubscribeHandler(element){
	var id = element.data("id");
		subscription.unsubscribe(id);
		//getSessionsUsername(subscription.movePlayer, element, "unsubscribeList");
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
 * Adds all the handlers to the training panel, after the panel is loaded.
 */
function addTrainingPanelHandlers(){
	util.addHandlerToElements(".subscribe", "click", function(){subscribeHandler($(this));});
	util.addHandlerToElements(".unsubscribe", "click", function(){unsubscribeHandler($(this));});
	util.addHandlerToElements(".removeTraining", "click", function(){removeTrainingHandler($(this));});
	util.addHandlerToElements(".addTrainingPlan", "click", function(){addTrainingPlanHandler($(this));});
	util.addHandlerToElements(".addTrainingNotification", "click", function() {addTrainingNotificationHandler($(this));});
	util.addHandlerToElements(".notification", "click", function(){displayNotification($(this));});		//Deactivate, beause this is set after adding the notification data to the labels.	//HERE add the notification element to the panels-JSON
	util.addHandlerToElements(".changeEvent", "click", function() {loadChangeEventHandler($(this));});
}

/**
 * Adds all the handlers to the dropdown menu of a participant.
 */
function addParticipantsHandlers(){
	util.addHandlerToElements(".signUpPlayer", "click", function(){signUpPlayerHandler($(this));});
	util.addHandlerToElements(".signOutPlayer", "click", function(){signOutPlayerHandler($(this));});
	util.addHandlerToElements(".removePlayer", "click", function(){removePlayerHandler($(this));});
	util.addHandlerToElements(".signUpPlayerAlways", "click", function(){signUpPlayerAlwaysHandler($(this));});
	util.addHandlerToElements(".signOutPlayerAlways", "click", function(){signOutPlayerAlwaysHandler($(this));});
	util.addHandlerToElements(".activate", "click", function(){activatePlayerHandler($(this));});
	util.addHandlerToElements(".deactivate", "click", function(){deactivatePlayerHandler($(this));});
	util.addHandlerToElements(".grantTrainer", "click", function(){grantTrainerHandler($(this));});
	util.addHandlerToElements(".denyTrainer", "click", function(){denyTrainerHandler($(this));});
	util.addHandlerToElements(".grantAdmin", "click", function(){grantAdminHandler($(this));});
	util.addHandlerToElements(".denyAdmin", "click", function(){denyAdminHandler($(this));});
	util.addHandlerToElements(".resetPassword", "click", function(){resetPasswordHandler($(this));});
	util.addHandlerToElements(".deletePlayer", "click", function(){deleteUserHandler($(this));});
	util.addHandlerToElements(".editPlayer", "click", function(){editPlayerHandler($(this));});
}



	/**
	 * This function is called after the data is rendered. Call here the event handlers that should be appended to the new elements.
	 */
	function postRender(data){
			panels = data.panels;
			addTrainingPanelHandlers();
			addParticipantsHandlers();


		/**
		 * Allways call this function after generating new content.
		 */
		require(["js/content_switcher"], function(cs){
			var content = cs.getContent();
			
			//The first entry has to be the filename of the module without the extention
			content.addEntry("trainings", data.panels, $("#screen").html());
		});
	}

	/**
	 * This function takes the data returned from the server, and renders them to display to the client.
	 * A postrender function is called to add eventHandlers to the newly rendered elements.
	 */
	function renderTrainings(data){
		console.log(data);
		render.render("trainings.must", data.result, "#screen", function(){postRender(data);});

	}

	var pub = {
		/**
		 * Request the data for trainings from the server and hand them to a render function.
		 */
		loadTrainings: function(){
			rc.call_server_side_function("TrainingUtil", "getTraining", {}, renderTrainings);
		},
		loadContent: function(){
			this.loadTrainings();
		}
	};

	return pub;
});



var panels = {};
