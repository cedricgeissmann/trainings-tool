var innerTrainingPlanTransform = [{
	"tag": "div",
	"class": "exercise",
	"data-id": "${id}",
	"children": [{
		"tag": "div",
		"class": "row",
		"children": [{
			"tag": "h3",
			"class": "col-sm-9 exerciseTitle",
			"children": [{
				"tag": "span",
				"children": [{
					"tag": "input",
					"type": "text",
					"maxlength": 5,
					"size": 1,
					"class": "startTime",
					"data-id": "${id}",
					"value": "${time_start}"
				}]
			},{
				"tag": "span",
				"html": " - "
			},{
				"tag": "span",
				"children": [{
					"tag": "input",
					"type": "text",
					"maxlength": 5,
					"size": 1,
					"class": "endTime",
					"data-id": "${id}",
					"value": "${time_end}"
				}]
			},{
				"tag": "span",
				"html": ": ",
			},{
				"tag": "span",
				"class": "exerciseTitleAutocompleteAppend",
				"children": [{
					"tag": "input",
					"class": "exerciseTitleField",
					"value": "${title}",
					"data-id": "${id}",
					"data-autosize-input": "{ \"space\": 40 }"
				}]
			}]
		},{
			"tag": "div",
			"class": "input-group col-sm-2",
			"children": [{
				"tag": "span",
				"class": "input-group-addon",
				"html": "Dauer: "
			},{
				"tag": "input",
				"type": "text",
				"class": "form-control durationField",
				"value": "${duration}",
				"data-id": "${id}"
			}]
		},{
			"tag": "div",
			"class": "col-sm-1",
			"children": [{
				"tag": "button",
				"class": "close removeExercise",
				"data-id": "${id}",
				"html": "&times"
			}]
		}]
	},{
		"tag": "textarea",
		"class": "form-control exerciseDescription",
		"html": "${description}",
		"data-id": "${id}"
	}]
}];