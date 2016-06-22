var defaultCalendar = {
	"eventSources": [{
		events: function(start, end, timezone, callback) {
			$.ajax({
				"type": "POST",
				"url": "server/TrainingUtil.php",
				"data": {
					"function": "getEventList"
				},
				"success": function(data) {
					//console.log(data);
					var eventData = jQuery.parseJSON(data);
					$.each(eventData, function(i, obj) {
						//console.log(obj);
						obj.start = obj.date + "T" + obj.time_start + ":00";
						obj.end = obj.date + "T" + obj.time_end + ":00";
						obj.title = obj.type;
						obj.allDay = false;
						obj.description = obj.name+": "+obj.type+"<br>Von "+obj.time_start+" bis "+obj.time_end+"<br>in "+obj.location;
						obj.url="main.php#"+obj.id;
						if (obj.type === "Training") {
							//obj.backgroundColor="#3cf2ec";
						}
					});
					callback(eventData);
				},
				"async": false
			});
		}
	}],
	"eventRender": function(event, element) {
		element.popover({
			html: true,
			trigger: "click hover",
			delay: { show: 200, hide: 200 },
			placement: "top",
			title: event.title,
			content: event.description,
			container: "body"
		});
	},
	"selectable": true,
	"eventClick": function(event) {
		//console.log(event);
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
	select: function(start, end, allDay, event, resourceID) {
		//console.log(start + " " + end);
		//console.log(allDay);
		$("#calendar").fullCalendar("renderEvent", {
			title: "test",
			start: start,
			end: end,
			allDay: false
		}, true);
	},
	editable: true,
	header: {
		"left": "prev,today,next",
		"center": "title",
		"right": "agendaDay,agendaWeek,month"
	}
};