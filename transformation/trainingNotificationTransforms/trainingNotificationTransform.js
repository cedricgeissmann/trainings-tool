var trainingNotificationTransform = {
	"tag": "div",
	"class": "modal fade",
	"id": "trainingNotificationModal",
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
				"id": "trainingNotificationModalContent",
				"children": [{
					"tag": "ul",
					"class": "list-group",
					"html": function(){
						//console.log(this);
						return renderTrainingNotifications(this.notification);
					}
				}]
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
};