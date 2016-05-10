
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
 * Adds an eventhandler to the specified html element, which triggers the function for a player to unsubscribe himself.
 * @param element the html element to which the handler gets attached.
 */
function unsubscribeHandler(element){
	var id = element.data("id");
		subscription.unsubscribe(id);
		getSessionsUsername(subscription.movePlayer, element, "unsubscribeList");
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
