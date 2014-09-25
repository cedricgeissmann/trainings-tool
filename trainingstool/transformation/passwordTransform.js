var passwordTransform = {
		"tag": "div",
		"class": "modal fade",
		"id": "pwModal",
		"tabindex": "-1",
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
						"class": "close",
						"data-dismiss": "modal",
						"html": "&times"
					},{
						"tag": "h4",
						"class": "modal-title",
						"html": "Passwort für ${firstname} ${name} zurücksetzen"
					}]
				},{
					"tag": "div",
					"class": "modal-body",
					"children": [{
						"tag": "div",
						"id": "passwordHint"
					},{
						"tag": "div",
						"class": "input-group",
						"children": [{
							"tag": "label",
							"for": "password",
							"html": "Neues Passwort: "
						},{
							"tag": "input",
							"id": "password",
							"type": "password",
							"class": "form-control"
						},{
							"tag": "label",
							"for": "passwordConfirm",
							"html": "Passwort bestätigen: "
						},{
							"tag": "input",
							"id": "passwordConfirm",
							"type": "password",
							"class": "form-control"
						}]
					}]
				},{
					"tag": "div",
					"class": "modal-footer",
					"html": "<button type='button' class='btn btn-primary' onclick='resetPW(\"${username}\")'>Passwort zurücksetzen</button>"
				}]
			}]
		}]
};