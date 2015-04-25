/**
 * Load the data needed for the attendance check as a JSON array and hands it to the render function.
 */
function loadAttendanceCheckData(){
	$.ajax({
		"type": "POST",
		"url": "server/TrainingUtil.php",
		"data": {
			"function": "attendanceCheck"
		},
		"dataType": "json",
		"success": function(data){
			renderAttendanceCheck(data);
		}
	});
}

/**
 * Gets an JSON array as input and converts it to an html element. Adds this element to the page.
 * @param attendanceData a JSON array, that contains the data to render the html element.
 */
function renderAttendanceCheck(attendanceData){
	var res = json2html.transform(attendanceData, attendanceCheckTransform);
	$("#content").html(res);
	setupButtons();
	addHandlers();
}

/**
 * Renders the JSON array that contains the participants into an html element, and returns this.
 * @param participants a JSON array that contains the participant's data.
 * @returns a html element which is rendered from the input JSON array.
 */
function renderParticipants(participants){
	var res = json2html.transform(participants, participantsTransform);
	return res;
}

/**
 * Change the data attribute attendance of this element to 1.
 * @param elem the html element that is clicked to trigger this event.
 */
function changeToSubscribe(elem){
	var parent = $(elem.parentElement);
	parent.data("subscribed", 1);
	parent.find(".subscribedButton").prop("disabled", true);
	parent.find(".unsubscribedButton").prop("disabled", false);
	submitSubscribeChange(parent);
}

/**
 * A change in subscribtion has occured. Send this to the server.
 * @param element the html element that triggers the event.
 */
function submitSubscribeChange(element){
	var username = element.data("username");
	var subscribed = element.data("subscribed");
	var id = element.data("id");
	$.ajax({
		"type": "POST",
		"url": "server/TrainingUtil.php",
		"data": {
			"trainingsID": id,
			"username": username,
			"subscribed": subscribed,
			"function": "commitAttendanceForUser"
		},
		"success": function(data){
			//console.log(data);
		}
	});
}

/**
 * Change the data attribute attendance of this element to 0.
 * @param elem the html element that is clicked to trigger this event.
 */
function changeToUnsubscribe(elem){
	var parent = $(elem.parentElement);
	parent.data("subscribed", 0);
	parent.find(".subscribedButton").prop("disabled", false);
	parent.find(".unsubscribedButton").prop("disabled", true);
	submitSubscribeChange(parent);
}

/**
 * Sends the actual data to the server. Removes the training from the list.
 * @param elem the html element that triggers the event.
 */
function commitAttendanceCheck(elem){
	var element = $(elem);
	var parentPanel = element.closest(".panel");
	parentPanel.find(".unsubscribedButton").each(function(){		//TODO outsource to an own function
		var parent = $(this.parentElement);
		submitSubscribeChange(parent);
	});
	var id = element.data("id");
	$.ajax({
		"type": "POST",
		"url": "server/TrainingUtil.php",
		"data": {
			"id": id,
			"function": "commitAttendanceCheck"
		},
		"success": function(){
			element.closest(".panel").hide(500);
		}
	});
}

/**
 * Add all the event handlers to the elements that are rendered so far.
 */
function addHandlers(){
	addHandlerToElements(".subscribedButton", "click", function(){changeToSubscribe(this);});
	addHandlerToElements(".unsubscribedButton", "click", function(){changeToUnsubscribe(this);});
	addHandlerToElements(".commitAttendanceCheck", "click", function(){commitAttendanceCheck(this);});
}

/**
 * Sets if a button should be displayed as disabled or not.
 */
function setupButtons(){
	$(".checkSubscriptionButtonGroup").each(function(){
		var elem = $(this);
		var subscribed = elem.data("subscribed");
		if(subscribed===1){
			elem.find(".subscribedButton").prop("disabled", true);
		}else if(subscribed===0){
			elem.find(".unsubscribedButton").prop("disabled", true);
		}
	});
}

/**
 * Call this function when the ducument is ready.
 */
$(document).ready(function(){
	loadAttendanceCheckData();
	changeNavbarActive("nav-attendanceCheck");
});