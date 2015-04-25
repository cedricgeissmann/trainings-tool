defaultNotificationData = [{
	"content": "Hier stehen Informationen"
}]

defaultNotificationTransform = {
	"tag": "div",
	"class": "modal fade",
	"id": "notificationModal",
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
					"html": "Info"
				}]
			},{
				"tag": "div",
				"class": "modal-body",
				"id": "notificationModalContent"
			},{
				"tag": "div",
				"class": "modal-footer",
				"children": [{
					"tag": "button",
					"type": "button",
					"class": "btn btn-primary",
					"data-dismiss": "modal",
					"html": "Schliessen"
				}]
			}]
		}]
	}]
}