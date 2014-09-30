var outterTrainingPlanTransform = {
	"tag": "div",
	"class": "panel panel-default",
	"children": [{
		"tag": "div",
		"class": "panel-heading",
		"html": function(){return setupTrainingPlanHeader(this.training);}
	},{
		"tag": "div",
		"class": "panel-body",
		"children": [{
			"tag": "div",
			"class": "row",
			"children": [{
				"tag": "div",
				"class": "col-md-3",
				"children": [{
					"tag": "div",
					"html": "Anzahl Spieler: "
				},{
					"tag": "div",
					"html": function(){return getNumberOfPlayersForTraining(this.trainingID, function(){});}
				}]
			},{
				"tag": "div",
				"class": "col-md-3",
				"children": [{
					"tag": "span",
					"html": "Trainer: "
				},{
					"tag": "span",
					"children": [{
						"tag": "select",
						"id": "trainerSelection",
						"class": "form-control"
					}]
				}]
			},{
				"tag": "div",
				"class": "col-md-3",
				"children": [{
					"tag": "span",
					"html": "Assistenztrainer: "
				},{
					"tag": "span",
					"children": [{
						"tag": "select",
						"id": "trainerAssistanceSelection",
						"class": "form-control"
					}]
				}]
			},{
				"tag": "div",
				"children": [{
					"tag": "div",
					"class": "col-md-3",
					"children": [{
						"tag": "div",
						"html": "Trainingsdauer: "
					},{
						"tag": "div",
						"id": "trainingDuration"
					}]
				}]
			}]
		},{
			"tag": "div",
			"id": "trainingPlanList",
			"html": function(){return setupTrainingPlan(this.trainingPlan);}
		},{
			"tag": "div",
			"id": "calendar",
			//style: "display: none"
			//"html": function(){return setupTrainingPlan(this.trainingPlan);}
		},{
			"tag": "button",
			"class": "btn btn-default addExercise",
			"html": "Übung hinzufügen",
			"data-toggle": "modal",
			"data-target": "#modalNewExercise",
		}]
	}]
};