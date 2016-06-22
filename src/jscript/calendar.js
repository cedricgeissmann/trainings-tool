/**
 * Call this function to display the calendar.
 */
function renderCalendar(){
	$("#calendar").fullCalendar(defaultCalendar);
}

/**
 * When document is loaded, call these functions.
 */
$(document).ready(function(){
	changeNavbarActive("nav-calendar");
	renderCalendar();
});