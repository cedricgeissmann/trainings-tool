var panelTransform = {
	"tag": "div",
	"class": "panel panel-default team${teamID} ${type}",
	"data-teamID": "${teamID}",
	"id": "${id}",
	"data-id": "${id}",
	"children": [{
		"tag": "div",
		"class": "panel-heading",
		"children": [{
			"tag": "span",
			"class": "label label-primary notification col-xs-1",
			"data-id": "${id}"
		}, {
			"tag": "h4",
			"class": "panel-title col-xs-10",
			"html": "${type}: ${day} ${date} ${time_start} - ${time_end}"
		}, {
			"tag": "div",
			"class": "btn-group",
			"children": [{
				"tag": "a",
				"href": "#",
				"class": "dropdown-toggle visibleAdmin visibleTrainer",
				"data-toggle": "dropdown",
				"children": [{
					"tag": "span",
					"class": "glyphicon glyphicon-cog"
				}, {
					"tag": "b",
					"class": "caret"
				}]
			}, {
				"tag": "ul",
				"class": "dropdown-menu pull-right",
				"children": [{
					"tag": "li",
					"children": [{
						"tag": "a",
						"class": "removeTraining visibleAdmin visibleTrainer",
						"href": "#!",
						"name": "${id}",
						"data-id": "${id}",
						"html": "Training löschen"
					}]
				}, {
					"tag": "li",
					"children": [{
						"tag": "a",
						"class": "addTrainingPlan visibleTrainer",
						"href": "#!",
						"name": "${id}",
						"data-id": "${id}",
						"html": "Traininplan bearbeiten"
					}]
				}, {
					"tag": "li",
					"children": [{
						"tag": "a",
						"class": "addTrainingNotification visibleAdmin visibleTrainer",
						"href": "#!",
						"data-id": "${id}",
						"html": "Benachrichtigung hinzufügen"
					}]
				}, {
					"tag": "li",
					"children": [{
						"tag": "a",
						"class": "changeEvent visibleAdmin visibleTrainer",
						"href": "#!",
						"data-id": "${id}",
						"html": "Ereigniss bearbeiten"
					}]
				}]
			}]
		}]
	}, {
		"tag": "div",
		"class": "panel-body",
		"children": [{
			"tag": "div",
			"class": "numberDiv",
			"children": [{
				"tag": "span",
				"html": "Anzahl Teilnehmer: "
			}, {
				"tag": "span",
				"data-id": "${id}",
				"class": "numberOfPlayers",
				"html": 0
			}]
		}, {
			"tag": "div",
			"class": "locationDiv",
			"children": [{
				"tag": "span",
				"html": "Ort: "
			}, {
				"tag": "span",
				"html": "${location}",
				"class": "locationSpan"
			}]
		}, {
			"tag": "div",
			"class": "meetingPointDiv",
			"children": [{
				"tag": "span",
				"html": "Treffpunkt: "
			}, {
				"tag": "span",
				"html": "${meeting_point}",
				"class": "meetingPointSpan"
			}]
		}, {
			"tag": "div",
			"class": "enemyDiv",
			"children": [{
				"tag": "span",
				"html": "Gegner: "
			}, {
				"tag": "span",
				"html": "${enemy}",
				"class": "enemySpan"
			}]
		}, {
			"tag": "div",
			"class": "col-sm-4",
			"children": [{
				"tag": "a",
				"href": "#!",
				"class": "subscribe",
				"name": "${id}",
				"data-id": "${id}",
				"children": [{
					"tag": "h2",
					"html": "Anmelden:"
				}]
			}, {
			"tag": "div",
			"data-id": "${id}",
			"class": "subscribeList",
		}]
		}, {
			"tag": "div",
			"class": "col-sm-4",
			"children": [{
				"tag": "a",
				"href": "#!",
				"class": "unsubscribe",
				"name": "${id}",
				"data-id": "${id}",
				"children": [{
					"tag": "h2",
					"html": "Abmelden:"
				}]
			}, {
			"tag": "div",
			"data-id": "${id}",
			"class": "unsubscribeList",
		}]
		}, {
			"tag": "div",
			"class": "col-sm-4",
			"children": [{
				"tag": "a",
				"href": "#!",
				"name": "${id}",
				"data-id": "${id}",
				"children": [{
					"tag": "h2",
					"html": "Nicht gemeldet:"
				}]
			}, {
			"tag": "div",
			"data-id": "${id}",
			"class": "notSubscribedList",
		}]
		}]
	}]
};