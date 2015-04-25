var attendanceCheckTransform = {
	"tag": "div",
	"class": "panel panel-default team-${team_id} ${type}",
	"children": [{
		"tag": "div",
		"class": "panel-heading",
		"children": [{
			"tag": "div",
			"class": "col-xs-10",
			"html": "${team_name}: ${type} am ${date} von ${time_start} bis ${time_end}"
		},{
			"tag": "botton",
			"class": "btn btn-primary commitAttendanceCheck",
			"data-id": "${id}",
			"html": "Absenden"
		}]
	},{
		"tag": "div",
		"class": "panel-body",
		"children": [{
			"tag": "ul",
			"class": "list-group",
			"html": function(){
				return renderParticipants(this.users);
			}
		}]
	}]
};