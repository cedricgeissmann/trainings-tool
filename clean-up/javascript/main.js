panelTransform = {
    "tag": "div",
    "class": "panel panel-default ${team}",
    "children": [{
        "tag": "div",
        "class": "panel-heading",
        "children": [{
            "tag": "h4",
            "class": "panel-title col-xs-11",
            "html": "${day} ${date} ${time}"
        },{
            "tag": "div",
            "class": "btn-group",
            "children": [{
                "tag": "a",
                "href": "#",
                "class": "dropdown-toggle",
                "data-toggle": "dropdown",
                "children": [{
                    "tag": "span",
                    "class": "glyphicon glyphicon-cog"
                },{
                    "tag": "b",
                    "class": "caret"
                }]
            },{
                "tag": "ul",
                "class": "dropdown-menu",
                "children": [{
                    "tag": "li",
                    "html": "test"
                }]
            }]
        }]
    },{
        "tag": "div",
        "class": "panel-body",
        "children": [{
            "tag": "div",
            "class": "col-sm-6",
            "children": [{
                "tag": "a",
                "href": "#",
                "children": [{
                    "tag": "h2",
                    "html": "Anmelden:"
                }]
            }]
        },{
            "tag": "div",
            "class": "col-sm-6",
            "children": [{
                "tag": "a",
                "href": "#",
                "children": [{
                    "tag": "h2",
                    "html": "Abmelden:"
                }]
            }]
        }]
    }]
}

/**
 * Test data
 */
panelData = [{
    "id": "1",
    "day": "Donnerstag",
    "date": "26.12.2013",
    "time": "20:30 - 22:00",
    "team": "herren"
},{
    "id": "2",
    "day": "Dienstag",
    "date": "24.12.2013",
    "time": "20:30 - 22:00",
    "team": "u19"
}]


/**
 * Loads the panels for the trainings.
 */
function loadPanels(){
	//TODO ajax request for panel data.
	var response = "";
	$.ajax({
		type: "POST",
		url: "server/TrainingUtil.php",
		async: false,
		data: {
			'function': "getTraining"
		},
		success: function(data){
			console.log(data);
			response = data;
		}
	});
	panelData = jQuery.parseJSON(response);
    var res = json2html.transform(panelData, panelTransform);
    $("#content").html(res);
}

/**
 * When document is loaded, load the trainings.
 */
$("document").ready(function(){
    loadPanels();
});