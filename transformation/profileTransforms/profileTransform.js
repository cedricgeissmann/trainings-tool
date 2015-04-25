var profileTransform = {
	"tag": "form",
	"role": "form",
	"id": "profileForm",
	"children": [{
		"tag": "div",
		"class": "panel panel-default",
		"children": [{
			"tag": "div",
			"class": "panel-heading",
			"html": "Angaben zur Person"
		},{
			"tag": "div",
			"class": "panel-body",
			"children": [{
				"tag": "div",
				"class": "form-group",
				"children": [{
					"tag": "label",
					"for": "usernameField",
					"html": "Benutzername: "
				},{
					"tag": "input",
					"type": "text",
					"id": "usernameField",
					"name": "usernameField",
					"class": "form-control",
					"value": "${username}",
					"disabled": "",
				}]
			},{
				"tag": "div",
				"class": "form-group",
				"children": [{
					"tag": "label",
					"for": "firstnameField",
					"html": "Vorname: "
				},{
					"tag": "input",
					"type": "text",
					"id": "firstnameField",
					"name": "firstnameField",
					"class": "form-control",
					"value": "${firstname}"
				}]
			},{
				"tag": "div",
				"class": "form-group",
				"children": [{
					"tag": "label",
					"for": "nameField",
					"html": "Nachname: "
				},{
					"tag": "input",
					"type": "text",
					"id": "nameField",
					"name": "nameField",
					"class": "form-control",
					"value": "${name}"
				}]
			},{
				"tag": "div",
				"class": "form-group",
				"children": [{
					"tag": "label",
					"for": "dateField",
					"html": "Geburtsdatum: "
				},{
					"tag": "input",
					"type": "text",
					"id": "dateField",
					"name": "dateField",
					"class": "form-control datepicker",
					"value": "${birthdate}",
					"placeholder": "yyyy-mm-dd"
				}]
			},{
				"tag": "div",
				"class": "form-group",
				"children": [{
					"tag": "label",
					"for": "mailField",
					"html": "E-Mail: "
				},{
					"tag": "input",
					"type": "email",
					"id": "mailField",
					"name": "mailField",
					"class": "form-control",
					"value": "${mail}"
				}]
			},{
				"tag": "div",
				"class": "form-group",
				"children": [{
					"tag": "label",
					"for": "phoneField",
					"html": "Telefon: "
				},{
					"tag": "input",
					"type": "text",
					"id": "phoneField",
					"name": "phoneField",
					"class": "form-control bfh-phone",
					"value": "${phone}",
					"data-format": "+41 dd ddd dd dd",
					"placeholder": "+41 7x xxx xx xx"
				}]
			}]
		}]
	},{
		"tag": "div",
		"class": "panel panel-default",
		"children": [{
			"tag": "div",
			"class": "panel-heading",
			"html": "Adresse"
		},{
			"tag": "div",
			"class": "panel-body",
			"children": [{
				"tag": "div",
				"class": "form-group col-xs-9",
				"children": [{
					"tag": "label",
					"for": "streetnameField",
					"html": "Strasse: "
				},{
					"tag": "input",
					"type": "text",
					"id": "streetnameField",
					"name": "streetnameField",
					"class": "form-control",
					"value": "${street}"
				}]
			},{
				"tag": "div",
				"class": "form-group col-xs-3",
				"children": [{
					"tag": "label",
					"for": "streetNumberField",
					"html": "Nummer: "
				},{
					"tag": "input",
					"type": "text",
					"id": "streetNumberField",
					"name": "streetNumberField",
					"class": "form-control",
					"value": "${street_number}"
				}]
			},{
				"tag": "div",
				"class": "form-group col-xs-4",
				"children": [{
					"tag": "label",
					"for": "zipField",
					"html": "PLZ: "
				},{
					"tag": "input",
					"type": "text",
					"id": "zipField",
					"name": "zipField",
					"class": "form-control",
					"value": "${zip}"
				}]
			},{
				"tag": "div",
				"class": "form-group col-xs-8",
				"children": [{
					"tag": "label",
					"for": "cityField",
					"html": "Stadt: "
				},{
					"tag": "input",
					"type": "text",
					"id": "cityField",
					"name": "cityField",
					"class": "form-control",
					"value": "${city}"
				}]
			}]
		}]
	},{
		"tag": "div",
		"class": "panel panel-default",
		"children": [{
			"tag": "div",
			"class": "panel-heading",
			"id": "changePasswordPanel",
			"html": "Passwort ändern"
		},{
			"tag": "div",
			"class": "panel-body",
			"id": "oldPasswordForm",
			"children": [{
				"tag": "div",
				"class": "form-group",
				"id": "oldPasswordGroup",
				"children": [{
					"tag": "label",
					"for": "oldPasswordField",
					"html": "Altes Passwort: ",
					"id": "oldPasswordLabel"
				},{
					"tag": "input",
					"type": "password",
					"id": "oldPasswordField",
					"name": "oldPasswordField",
					"class": "form-control"
				}]
			},{
				"tag": "div",
				"class": "form-group",
				"id": "newPasswordForm",
				"children": [{
					"tag": "label",
					"for": "newPasswordField",
					"html": "Neues Passwort: ",
					"id": "newPasswordLabel"
				},{
					"tag": "input",
					"type": "password",
					"id": "newPasswordField",
					"name": "newPasswordField",
					"class": "form-control"
				}]
			},{
				"tag": "div",
				"class": "form-group",
				"id": "newPasswordConfirmForm",
				"children": [{
					"tag": "label",
					"for": "newPasswordConfirmField",
					"html": "Neues Passwort bestätigen: ",
					"id": "newPasswordConfirmLabel"
				},{
					"tag": "input",
					"type": "password",
					"id": "newPasswordConfirmField",
					"name": "newPasswordConfirmField",
					"class": "form-control"
				}]
			}]
		}]
	},{
		"tag": "div",
		"class": "panel panel-default",
		"id": "teamSelectionPanel",
		"children": [{
			"tag": "div",
			"class": "panel-heading",
			"html": "Team"
		},{
			"tag": "div",
			"class": "panel-body",
			"id": "teamSelectPanel",
			"children": [{
				"tag": "div",
				"class": "form-group",
				"id": "teamSelectGroup",
				"children": [{
					"tag": "label",
					"for": "teamSelector",
					"html": "Team: "
				},{
					"tag": "select",
					"multiple": "",
					"id": "teamSelector",
					"name": "teamSelector[]",
					"class": "form-control"
				}]
			}]
		}]
	},{
		"tag": "button",
		"type": "submit",
		"html": "Absenden"
	}]
}