var createTrainingNotificationTransform = {
	"tag": "div",
	"class": "modal fade",
	"id": "createTrainingNotificationModal",
	"children": [{
		"tag": "div",
		"class": "modal-dialog",
		"children": [{
			"tag": "div",
			"class": "modal-content",
			"children": [{
				"tag": "div",
				"class": "modal-header",
				"children": [{
					"tag": "button",
					"type": "button",
					"class": "close",
					"data-dismiss": "modal",
					"aria-hidden": "true",
					"html": "&times;"
				},{
					"tag": "h4",
					"class": "modal-title",
					"html": "Benachrichtigung erfassen"
				}]
			},{
				"tag": "div",
				"class": "modal-body",
				"id": "createTrainingNotificationModalContent",
				"children": [{
					"tag": "div",
					"class": "form-group col-xs-12",
					"children": [{
						"tag": "label",
						"for": "trainingNotificationTitleField",
						"html": "Titel:"
					},{
						"tag": "input",
						"class": "form-control",
						"id": "trainingNotificationTitleField"
					}]
				},{
					"tag": "div",
					"class": "form-group col-xs-12",
					"children": [{
						"tag": "label",
						"for": "trainingNotificationContentField",
						"html": "Beschreibung:"
					},{
						"tag": "textarea",
						"class": "form-control",
						"id": "trainingNotificationContentField"
					}]
				}]
			},{
				"tag": "div",
				"class": "modal-footer",
				"children": [{
					"tag": "button",
					"type": "button",
					"class": "btn btn-default",
					"data-dismiss": "modal",
					"html": "Schliessen"
				},{
					"tag": "button",
					"type": "button",
					"id": "sendTrainingNotification",
					"data-id": "${id}",
					"class": "btn btn-primary",
					"data-dismiss": "modal",
					"html": "Erfassen"
				}]
			}]
		}]
	}]
};