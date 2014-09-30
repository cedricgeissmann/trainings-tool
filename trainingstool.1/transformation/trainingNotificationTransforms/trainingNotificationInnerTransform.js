var trainingNotificationInnerTransform = {
	"tag": "li",
		"class": "list-group-item",
		"children": [{
			"tag": "b",
			"html": "${title}"
		},{
			"tag": "button",
			"class": "close deleteTrainingNotification visibleAdmin visibleTrainer",
			"data-id": "${id}",
			"html": "&times"
		},{
			"tag": "div",
			"html": "${message}"
		}]
	};