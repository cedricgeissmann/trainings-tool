/**
 * Takes a JSON array that contains data of a specific training and converts it to an html element.
 * @param trainingData a JSON array that contains the data of the training.
 */
function renderTrainingPlan(trainingData) {
	if (trainingData[0].training.length === 0) {
		notifyUser("Konnte kein Training finden. Training existiert nicht oder liegt schon in der Vergangenheit.<br><a href='main.php'>Hier</a> können Sie ein neues Training auswählen.");
		return false;
	}
	var res = json2html.transform(trainingData, outterTrainingPlanTransform);
	$("#content").html(res);
	addHandlers();
	setTrainingDuration();
	loadTrainerData();
}

/**
 * TODO: this is probabli a dublicate of just loadTrainingByID
 * Loads the data to render a training plan for a specific training as JSON array and hands it to a render function.
 * @param trainingsID the id of the training for which the data will be loaded.
 */
function loadTrainingPlanData(trainingsID) {
	$.ajax({
		"type": "POST",
		"url": "server/TrainingUtil.php",
		"data": {
			"trainingsID": trainingsID,
			"function": "getTrainingPlan"
		},
		"dataType": "json",
		"success": function(data) {
			renderTrainingPlan(data);		//TODO replace with callback function
		},
	});
}

/**
 * Set the trainer and assistance trainer according to the data given by the JSON array.
 * @param selected a JSON array that contains the data for trainer or traininer assistance.
 */
function selectTrainer(selected) {
	$("#trainerSelection").val(selected.trainer);
	$("#trainerAssistanceSelection").val(selected.trainer_assistance);
}

/**
 * Loads the trainer data from the server for a specific training, as a JSON array and hands the data to the render function.
 */ 
function loadTrainerData() {
	var cacheObject = getItemFromCache("trainingPlanID");
	if(cacheObject === null){
		console.log("exit here because no cache item 'trainingID' was not found.");
		return false;
	}
	$.ajax({
		"type": "POST",
		"url": "server/TrainingUtil.php",
		"data": {
			"trainingID": cacheObject.data.id,
			"function": "loadTrainer"
		},
		"dataType": "json",
		"success": function(data) {
			renderTrainerData(data);		//TODO replace with a callback function.
		}
	});
}

/**
 * Takes a JSON array that contains which trainer are selected for this training and renders it to an html element.
 * @param trainerSelectionData a JSON array that contains the trainer data.
 */
function renderTrainerData(trainerSelectionData){
	var res = json2html.transform(trainerSelectionData.trainerList, trainerSelectionTransform);
	$("#trainerSelection").append(res);
	$("#trainerAssistanceSelection").append(res);
	selectTrainer(trainerSelectionData.selected[0]); //Only use the first element in the list.
}

/**
 * Renders the JSON array into an html element.
 * @param trainingPlan a JSON array that contains all detail for the training plan.
 * @returns an html element that dislays the training information.
 */
function setupTrainingPlan(trainingPlan) {
	var res = json2html.transform(trainingPlan, innerTrainingPlanTransform);
	return res;
}

/**
 * Renders the JSON array into an html element.
 * @param trainingPlan a JSON array that contains all detail for the training plan header.
 * @returns an html element that dislays the training header information.
 */
function setupTrainingPlanHeader(header) {
	var res = json2html.transform(header, trainingPlanHeaderTransform);
	return res;
}

/**
 * Calculates the overall duration for the training from all exercises summed up.
 */
function setTrainingDuration() {
	var durationList = $(".durationField");
	var duration = 0;
	durationList.each(function(i, obj) {
		duration = duration + parseInt(obj.value);
	});
	$("#trainingDuration").html(duration + " Minuten");
}

/**
 * Gets a time as input and adds a value to it.
 * @param timeVal the base time to which a value get added.
 * @param addTime time in minutes that will be added to the base time.
 * @returns the base time with the added value in the format hh:mm
 */
function timeAddition(timeVal, addTime) {
	addTime = parseInt(addTime);
	var timeArray = timeVal.split(":");
	var h = parseInt(timeArray[0]);
	var m = parseInt(timeArray[1]);
	m = m + addTime;
	var addHour = Math.floor(m / 60);
	h = h + addHour;
	m = (m + 60) % 60;
	if (m < 10) {
		m = "0" + m;
	}
	return h + ":" + m;
}

/**
 * TODO: deactivate these function, overlap should be possible.
 * Calculate the time of each event, so there is no overlap of exercises.
 */
function calculateNewTime() {
	var startTimeList = $(".startTime");
	var endTimeList = $(".endTime");
	var durationList = $(".durationField");
	var newStartTime = "";
	var endTime = "";
	startTimeList.each(function(i, obj) {
		if (i > 0) {
			startTimeList[i].value = newStartTime;
		}
		endTime = timeAddition(startTimeList[i].value, durationList[i].value);
		endTimeList[i].value = endTime;
		newStartTime = endTime;
		updateExerciseTime(durationList[i].getAttribute("data-id"), startTimeList[i].value, endTimeList[i].value, durationList[i].value);
	});
}

/**
 * Checks if a html input element has correct time format.
 * @param element the element that should have correct time format.
 * @returns boolean if format is correct or not.
 */
function checkTimeFormat(element) {
	var time = element.val();
	time = stringToTimeInterpreter(time);
	var timeArray = time.split(":");
	if (timeArray.length === 2) {
		element.val(time);
		return true;
	}
	return false;
}



var minDuration = 2;		//minimal duration for an exercise.		//TODO outsource to database or config file.

/**
 * Event handler that is called when a start time has changed.
 * @param element the html elment that has changed.
 */
function startTimeHasChanged(element) {
	if (checkTimeFormat(element)) {
		var startTimeList = $(".startTime");
		var endTimeList = $(".endTime");
		var durationList = $(".durationField");
		var newStartTime = "";
		startTimeList.each(function(i, obj) {
			if (i < startTimeList.length - 1) {
				nextStartTime = startTimeList[i + 1].value;
				endTimeList[i].value = nextStartTime;
			}
			duration = calculateDuration(startTimeList[i].value, endTimeList[i].value);
			if (duration < minDuration) {
				duration = minDuration;
				endTimeList[i].value = timeAddition(startTimeList[i].value, duration);
				if (i < startTimeList.length - 1) {
					startTimeList[i + 1].value = endTimeList[i].value;
				}
			}
			durationList[i].value = duration;
			updateExerciseTime(durationList[i].getAttribute("data-id"), startTimeList[i].value, endTimeList[i].value, durationList[i].value);
		});
	} else {
		notifyUser("Ungültiges Zeitformat");
	}
}

/**
 * Event handler that is called when a end time has changed.
 * @param element the html elment that has changed.
 */
function endTimeHasChanged(element) {
	if (checkTimeFormat(element)) {
		var startTimeList = $(".startTime");
		var endTimeList = $(".endTime");
		var durationList = $(".durationField");
		var newStartTime = "";
		startTimeList.each(function(i, obj) {
			if (i > 0) {
				startTimeList[i].value = newStartTime;
			}
			var duration = calculateDuration(startTimeList[i].value, endTimeList[i].value);
			if (duration < minDuration) {
				duration = minDuration;
				endTimeList[i].value = timeAddition(startTimeList[i].value, duration);
			}
			durationList[i].value = duration;
			newStartTime = endTimeList[i].value;
			updateExerciseTime(durationList[i].getAttribute("data-id"), startTimeList[i].value, endTimeList[i].value, durationList[i].value);
		});
	} else {
		notifyUser("Ungültiges Zeitformat");
	}
}

/**
 * Modifies end time, because start time has changed.
 */
function changeModalTimeStart() {
	var startTime = $("#startTimeField").val();
	var duration = $("#durationField").val();
	$("#endTimeField").val(timeAddition(startTime, duration));
}

/**
 * Modifies start time, because end time has changed.
 */
function changeModalTimeEnd() {
	var endTime = $("#endTimeField").val();
	var duration = $("#durationField").val();
	$("#startTimeField").val(timeAddition(endTime, duration * (-1)));
}

/**
 * Sends the time data for an exercise to the server, to store it in the database.
 * @param id id of the exercise that is updated.
 * @param startTime value of the start time for this exercise.
 * @param endTime value of the end time for this exercise.
 * @param duration the exercise duration.
 */
function updateExerciseTime(id, startTime, endTime, duration) {
	$.ajax({
		"type": "POST",
		"url": "server/TrainingUtil.php",
		"data": {
			"id": id,
			"duration": duration,
			"startTime": startTime,
			"endTime": endTime,
			"function": "updateExerciseDuration"
		}
	});
	setTrainingDuration();
}

/**
 * Updates the title of an exercise. Sends the data to the server to store it in the database. If the exercise allready exists, the server returns the additional exercise data, that will be rendered.
 * @param element the html element that has changed.
 */
function updateExerciseTitle(element) {
	var id = element.data("id");
	var title = element.val();
	$.ajax({
		"type": "POST",
		"url": "server/TrainingUtil.php",
		"data": {
			"id": id,
			"title": title,
			"function": "updateExerciseTitle"
		},
		"dataType": "json",
		"success": function(data) {
			console.log(data);
			if (data.length > 0) {
				var res = data;
				$(".exerciseDescription").each(function(i, obj) {
					if (id == obj.getAttribute("data-id")) {
						obj.value = res.description;
						$(obj).height(minHeight);
						$(obj).height(obj.scrollHeight);
					}
				});
				$(".durationField").each(function(i, obj) {
					if (id == obj.getAttribute("data-id")) {
						obj.value = res.duration;
					}
				});
				calculateNewTime();
			}
		}
	});
}

/**
 * Completes the information in the modal, when an allready existing exercise title gets selected.
 * @param title of the exercise, for which the data should be loaded.
 */
function completeExercise(title) {
	$.ajax({
		"type": "POST",
		"url": "server/TrainingUtil.php",
		"data": {
			"title": title,
			"function": "completeExercise"
		},
		"dataType": "json",
		"success": function(data) {
			console.log(data);
			var res = data;
			$("#descriptionField").val(res.description);
			$("#descriptionField").height(minHeight);
			$("#descriptionField").height($("#descriptionField")[0].scrollHeight);
			$("#durationField").val(res.duration);
		}
	});
}

/**
 * Updates the description of an exercise and sends this to the server, wehere is gets storred in the database.
 * @param element the html elment that has changed.
 */
function updateExerciseDescription(element) {
	var id = element.data("id");
	var description = element.val();
	$.ajax({
		"type": "POST",
		"url": "server/TrainingUtil.php",
		"data": {
			"id": id,
			"description": description,
			"function": "updateExerciseDescription"
		}
	});
}

/**
 * TODO: get id form element data attribute.
 * Updates the trainer for this training.
 * @param element the html element that selects the trainer.
 */
function updateTrainer(element) {
	var cacheObject = getItemFromCache("trainingPlanID");
	if(cacheObject === null){
		console.log("exit here because no cache item 'trainingID' was not found.");
		return false;
	}
	var username = element.val();
	//var id = element.data("id");		//TODO: use this
	$.ajax({
		"type": "POST",
		"url": "server/TrainingUtil.php",
		"data": {
			"username": username,
			"trainingID": cacheObject.data.id,
			"function": "updateTrainer"
		}
	});
}

/**
 * TODO: get id form element data attribute.
 * Updates the trainer assistance for this training.
 * @param element the html element that selects the trainer.
 */
function updateTrainerAssistance(element) {
	var cacheObject = getItemFromCache("trainingPlanID");
	if(cacheObject === null){
		console.log("exit here because no cache item 'trainingID' was not found.");
		return false;
	}
	var username = element.val();
	//var id = element.data("id");		//TODO: use this
	$.ajax({
		"type": "POST",
		"url": "server/TrainingUtil.php",
		"data": {
			"username": username,
			"trainingID": cacheObject.data.id,
			"function": "updateTrainerAssistance"
		}
	});
}

/**
 * TODO: make it async and add a callback function to deal with the result.
 * Gets a list of all exercises from the server.
 * @param callback the function that renders the ajax result.
 */
function getExerciseTitles() {
	var res = "";
	$.ajax({
		"type": "POST",
		"url": "server/TrainingUtil.php",
		"data": {
			"function": "getExerciseTitles"
		},
		"success": function(data) {
			//console.log(data);
			res = jQuery.parseJSON(data);
		},
		"async": false
	});
	//console.log(res);
	return res;
}

/**
 * A function handler that removes an exercise.
 * @param element The html element that triggers the event.
 */
function removeExerciseHandler(element) {
	var id = element.data("id");
	element.closest(".exercise").remove();
	$("#calendar").fullCalendar("removeEvents", id);
	removeExerciseById(id);
}

/**
 * Remove an exercise with the specified id from the database.
 * @param id the id of the exercise that will be removed.
 */
function removeExerciseById(id){
	$.ajax({
		"type": "POST",
		"url": "server/TrainingUtil.php",
		"data": {
			"id": id,
			"function": "removeExercise"
		},
	});
}

var exerciseTitleData = getExerciseTitles();


/**
 * Prepares the ducument for printing. Removes all elements that are not needed for print, and the decoration.
 */
function preparePrint() {
	var body = $("body").html();
	$("body").css("cssText", "margin-top: 0px !important");
	$("#content").css("padding-top",  "0px");
	$("#calendar").hide();
	$("#trainingPlanList").show();
	$(".btn").hide();
	$(".btn-group").hide();
	$(".navbar").hide();

	$("#printButton").hide();
	$(".addExercise").hide();
	$(".panel").removeClass("panel");
	$(".panel-heading").removeClass("panel-heading");
	$(".panel-body").removeClass("panel-body");

	$(".col-md-3").addClass("col-xs-3");
	$(".col-md-3").removeClass("col-md-3");

	$("#trainerSelection").replaceWith("<p>" + $("#trainerSelection :selected").text() + "</p>");
	$("#trainerAssistanceSelection").replaceWith("<p>" + $("#trainerAssistanceSelection :selected").text() + "</p>");

	$(".col-sm-9").addClass("col-xs-9");
	$(".col-sm-9").removeClass("col-sm-9");
	$(".col-sm-2").addClass("col-xs-2");
	$(".col-sm-2").removeClass("col-sm-2");

	$(".removeExercise").hide();
	$(".input-group").removeClass("input-group");
	$(".input-group-addon").removeClass("input-group-addon");
	$("input.form-control").each(function(i) {
		$(this).replaceWith("<span>" + $(this).val() + "</span>");
	});

	resizeTextAreas();

	window.print();
	$("body").html(body);
}

/**
 * Shows the list view for the trainingsplan and hides the calendar view.
 */
function showList() {
	$("#trainingPlanList").show("slow");
	$("#calendar").hide("slow");
}

/**
 * Shows the calendar view for the trainingsplan and hides the list view.
 */
function showCalendar() {
	$("#trainingPlanList").hide("slow");
	$("#calendar").show("slow");
}

/**
 * Resize all the textareas when the windows changes size.
 */
$(window).on("resize", resizeTextAreas());

/**
 * Add event handlers to all elements.
 */
function addHandlers() {
	addHandlerToElements(".durationField", "change", function() {
		calculateNewTime();
		updateCalendarEventHandler($(this));
	});
	addHandlerToElements(".startTime", "change", function(){
		startTimeHasChanged($(this));
		updateCalendarEventHandler($(this));
	});
	addHandlerToElements(".endTime", "change", function(){
		endTimeHasChanged($(this));
		updateCalendarEventHandler($(this));
	});
	addHandlerToElements(".exerciseTitleField", "change", function(){
		updateExerciseTitle($(this));
		updateCalendarEventHandler($(this));
	});
	addHandlerToElements(".exerciseDescription", "change", function(){
		updateExerciseDescription($(this));
		updateCalendarEventHandler($(this));
	});
	addHandlerToElements("#startTimeField", "change", function(){changeModalTimeStart();});
	addHandlerToElements("#endTimeField", "change", function(){changeModalTimeEnd();});
	addHandlerToElements("#durationField", "change", function(){changeModalTimeStart();});
	addHandlerToElements("#trainerSelection", "change", function(){updateTrainer($(this));});
	addHandlerToElements("#trainerAssistanceSelection", "change", function(){updateTrainerAssistance($(this));});
	addHandlerToElements(".removeExercise", "click", function(){removeExerciseHandler($(this));});
	addHandlerToElements("textarea", "input", function(){resizeActiveTextArea($(this));});
	addHandlerToElements("#printButton", "click", function(){preparePrint();});
	addHandlerToElements("#showListButton", "click", function(){showList();});
	addHandlerToElements("#showCalendarButton", "click", function(){showCalendar();});
}

/**
 * Gets the id of the training you want to plan, from the cache and initializes the loadTrainingPlanData with this is.
 */
function loadTrainingPlan() {
	var trainingID = getItemFromCache("trainingPlanID");
	if (trainingID === null) {
		notifyUser("Es wurde kein Training ausgewählt für das ein Trainingsplan erstellt werden soll. Wähle <a href='main.php'>hier</a> ein Training aus.");
		return false;
	}
	loadTrainingPlanData(trainingID.data.id);
}


/**
 * Sends the data provided in the newExercise-form and sends it with the id to the server.
 */
function createNewExercise() {
	var data = "";
	var id = $("#newExercise").data("id");
	if (id === undefined) {
		data = $("#newExercise").serialize();
	}else{
		data = $("#newExercise").serialize()+"&exerciseID="+id;
	}
	var cacheObject = getItemFromCache("trainingPlanID");
	if(cacheObject === null){
		console.log("has to exit, because no cache object 'trainingID' exists");
		return false;
	}
	var trainingID = cacheObject.data.id;
	$.ajax({
		"type": "POST",
		"url": "server/TrainingUtil.php",
		"data": data + "&trainingID=" + trainingID + "&function=createNewExercise",		//TODO: change serverside so that the exercise gets updated if the id allready exists.
		"success": function(res) {
			loadTrainingPlan();
			getTrainingDataCalendar(calendarCallback);
		}
	});
	$("#newExercise").removeData("id");
}

/**
 * Event handler that is triggered when the update calender is triggered.
 */
function updateCalendarEventHandler(elem){
	var id = elem.data("id");
	updateCalendarEvent(id);
}

/**
 * Updates a calendar event when e list element has changed. Gets all the data from the list element, and applies the changes in the calendar event.
 * @param id the id of the calendar event that should be updated.
 */
function updateCalendarEvent(id){
	var title = $(".exerciseTitleField[data-id="+id+"]").val();
	var description = $(".exerciseDescription[data-id="+id+"]").val();
	var start = $(".startTime[data-id="+id+"]").val();
	var end = $(".endTime[data-id="+id+"]").val();
	var duration = $(".durationField[data-id="+id+"]").val();
	var event = $("#calendar").fullCalendar("clientEvents", id)[0];			//take the first element, because there should be only one element in the list, due to the id filter.
	var date = event.date;
	event.title = title;
	event.description = description;
	event.time_start = start;
	event.start = date+"T"+start+":00";
	event.time_end = end;
	event.end = date+"T"+end+":00";
	event.duration = duration;
	$("#calendar").fullCalendar("updateEvent", event);
}

/**
 * Update an event in the list view acorrding to its corresponding calender event.
 * @param eventData a JSON object that represents the calendar event object.
 */
function updateExerciseFromCalendar(eventData) {
	var dataSelect = "[data-id=" + eventData.id + "]";
	$(".startTime" + dataSelect).val(eventData.time_start);
	$(".endTime" + dataSelect).val(eventData.time_end);
	$(".durationField" + dataSelect).val(eventData.duration);
}

/**
 * Update the event object, according to changes made to the object.
 * @param event a JSON object that represents the event which will be changed.
 */
function updateEvent(event) {
	var startTime = moment(event.start).zone("0000").format("HH:mm");
	var endTime = moment(event.end).zone("0000").format("HH:mm");
	event.time_start = startTime;
	event.time_end = endTime;
	event.duration = calculateDuration(startTime, endTime);
	updateExerciseFromCalendar(event);
	updateExercise(event.id);
}

/**
 * An event handler that is triggered when the delete button of an exercise is clicked. Remove the event elements from the html page. Send a command to the server, to remove the entry in the database.
 */
function deleteExercise(){
	var id = $("#newExercise").data("id");
	$(".exercise[data-id="+id+"]").remove();
	$("#calendar").fullCalendar("removeEvents", id);
	removeExerciseById(id);
}

/**
 * Sets up the autocomplete for all elements that requires it, and sets up the event handlers.
 */
function setAutocomplete() {
	$(".exerciseTitleField").autocomplete({
		"source": exerciseTitleData,
		"select": function(event, ui) {
			var element = $(this);
			element.val(ui.item.value);
			updateExerciseTitle($(this));
		}
	});
	$("#titleField").autocomplete({
		"source": exerciseTitleData,
		"select": function(event, ui) {
			var element = $(this);
			element.val(ui.item.value);
			completeExercise(ui.item.value);
		}
	});
	$(".exerciseTitleField").autocomplete("option", "appendTo", ".exerciseTitleAutocompleteAppend");
	$("#titleField").autocomplete("option", "appendTo", ".titleAutocompleteAppend");
}

/**
 * Updates a complete exercise and sends all the data to the server.
 */
function updateExercise(id){
	var title = $(".exerciseTitleField[data-id="+id+"]").val();
	var description = $(".exerciseDescription[data-id="+id+"]").val();
	var start = $(".startTime[data-id="+id+"]").val();
	var end = $(".endTime[data-id="+id+"]").val();
	var duration = $(".durationField[data-id="+id+"]").val();
	$.ajax({
		"type": "POST",
		"url": "server/TrainingUtil.php",
		"data": {
			"id": id,
			"title": title,
			"description": description,
			"time_start": start,
			"time_end": end,
			"duration": duration,
			"function": "updateFullExercise"
		},
	});
}


/**
 * Get the data for the training plan in calender form as a JSON object, and hands it over to the render function.
 * @param callback this is the render function used to display the JSON object as a calendar.
 */
function getTrainingDataCalendar(callback) {
	var cacheObject = getItemFromCache("trainingPlanID");
	if(cacheObject === null){
		console.log("exit here because no cache item 'trainingID' was not found.");
		return false;
	}
	$.ajax({
		"type": "POST",
		"url": "server/TrainingUtil.php",
		"data": {
			"trainingID": cacheObject.data.id,
			"function": "getTrainingData"
		},
		"dataType": "json",
		"success": function(data) {
			callback(data[0]);
		}
	});
}

/**
 * This is a callback function to render the training plan calendar.
 * @param data a JSON object that contains initialize ddata for the calendar.
 */
function calendarCallback(data){
	trainingPlanerCalendar.minTime = data.time_start+":00";
	trainingPlanerCalendar.maxTime = data.time_end+":00";
	$("#calendar").fullCalendar(trainingPlanerCalendar);
	$('#calendar').fullCalendar('gotoDate', data.date);
}

/**
 * This function adds a new event to the calendar.
 * @param start the time when the event begins.
 * @param end the time when the event ends.
 * @param title the title of the event.
 * @param description the description of the event.
 */
function renderNewEventCallback(start, end, title, description) {
	$("#calendar").fullCalendar("renderEvent", {
		title: title,
		start: start,
		end: end,
		allDay: false,
		description: description,
	}, true);
}

/**
 * Sets the entered event data and calls arender function to display the new event.
 */
function renderNewEvent(start, end, callback) {
	var startTime = moment(start).zone("0000").format("HH:mm");
	var endTime = moment(end).zone("0000").format("HH:mm");
	var duration = calculateDuration(startTime, endTime);
	$("#startTimeField").val(startTime);
	$("#endTimeField").val(endTime);
	$("#durationField").val(duration);
	$("#modalNewExercise").modal("toggle");
	$("#submitNewExercise").unbind();
	$("#submitNewExercise").on("click", function() {
		var title = $("#titleField").val();
		var description = $("#descriptionField").val();
		callback(start, end, title, description);
	});
	$("#deleteExerciseButton").hide();
	$("#createExerciseButton").html("Erstellen");
}


/**
 * TODO: outsource into a load training function, so all the javascripts can be combined to one page.
 * Call these functions when the document is ready.
 */
$(document).ready(function() {
	loadTrainingPlan();
	$("#deleteExerciseButton").hide();
	changeNavbarActive("nav-trainer");
	//setTimeout(setAutocomplete, 2000);		//wait because of ad removing.
	setAutocomplete();
	resizeTextAreas();
});

$(document).ready(function() {
	getTrainingDataCalendar(calendarCallback);
});