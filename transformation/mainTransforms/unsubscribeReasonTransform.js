unsubscribeReasonTransform = {
	"tag": "div",
	"class": "modal fade",
	"id": "unsubscribeReasonModal",
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
					"html": "Abmeldung begründen"
				}]
			},{
				"tag": "div",
				"class": "modal-body",
				"id": "unsubscribeReasonModalContent",
				"children": [{
					"tag": "form",
					"class": "row",
					"children": [{
						"tag": "div",
						"class": "form-group col-xs-12",
						"children": [{
							"tag": "label",
							"for": "selectReason",
							"html": "Grund auswählen:"
						},{
							"tag": "select",
							"id": "selectReason",
							"name": "selectReason",
							"class": "form-control",
						}]
					},{
						"tag": "div",
						"class": "form-group col-xs-12",
						"children": [{
							"tag": "label",
							"for": "reasonField",
							"html": "Beschreibung:"
						},{
							"tag": "textarea",
							"id": "reasonField",
							"name": "reasonField",
							"class": "form-control"
						}]
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
					"html": "Abbrechen"
				},{
					"tag": "button",
					"type": "button",
					"class": "btn btn-primary",
					"data-dismiss": "modal",
					"id": "unsubscribeWithReason",
					"html": "Senden"
				}]
			}]
		}]
	}]
}