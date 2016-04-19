var trainingPlanerCalendar = {
	"eventSources": [{
		events: function(start, end, timezone, callback) {
			$.ajax({
				"type": "POST",
				"url": "server/TrainingUtil.php",
				"data": {
					"trainingsID": function(){
						var cacheObject = getItemFromCache("trainingPlanID");
						if(cacheObject === null){
							console.log("cacheItem does not exist anymore...");
							return null;
						}
						return cacheObject.data.id;
					},
					"function": "getTrainingExercises"
				},
				"success": function(data) {
					console.log(data);
					var eventData = jQuery.parseJSON(data);
					$.each(eventData, function(i, obj) {
						obj.start = obj.date+"T"+obj.time_start + ":00";
						obj.end = obj.date+"T"+obj.time_end + ":00";
						obj.allDay = false;
					});
					callback(eventData);
				},
				"async": false
			});
		}
	}],
/* 	"eventRender": function(event, element) {
		element.popover({
			html: true,
			placement: "top",
			title: event.title,
			content: event.description,
			container: "body"
		});
	}, */
	"selectable": true,
	"eventClick": function(event) {
		console.log(event);
		$("#titleField").val(event.title);
		$("#descriptionField").val(event.description);
		$("#startTimeField").val(event.time_start);
		$("#endTimeField").val(event.time_end);
		$("#durationField").val(event.duration);
		$("#newExercise").data("id", event.id);
		$("#deleteExerciseButton").show();
		$("#createExerciseButton").html("Update");
		$("#modalNewExercise").modal("toggle");
	},
	"eventDrop": function(event, revertFunc){
		$("#calendar").fullCalendar("updateEvent", event);
		updateEvent(event);
	},
	"eventResize": function(event, revertFunc){
		updateEvent(event);
	},
	"axisFormat": "H:mm",
	"timeFormat": "H:mm",
	"titleFormat": {
		"week": "MMMM D YYYY"
	},
	"columnFormat": {
		"month": "dddd",
		"week": "dddd DD.MM.",
		"day": "dddd"
	},
	dayNames: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
	monthNames: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
	firstDay: 1,
	select: function(start, end, jsEvent, view) {
		renderNewEvent(start, end, renderNewEventCallback);
	},
	editable: true,
	defaultView: "agendaDay",
	minTime: "18:00:00",
	maxTime: "22:30:00",
	slotDuration: "00:05:00",
	slotEventOverlap: false,
	allDaySlot: false,
	header: {
		"left": "",
		"center": "",
		"right": ""
	}
};