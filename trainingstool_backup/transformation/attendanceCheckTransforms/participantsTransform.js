var participantsTransform = {
	"tag": "li",
	"class": "list-group-item",
	"children": [{
		"tag": "div",
		"class": "row",
		"children": [{
			"tag": "div",
			"class": "col-xs-9",
			"html": "${firstname} ${name}"
		},{
			"tag": "div",
			"class": "btn-group col-xs-3 checkSubscriptionButtonGroup",
			"data-username": "${username}",
			"data-subscribed": "${subscribed}",
			"data-id": "${id}",
			"children": [{
				"tag": "button",
				"type": "button",
				"class": "btn btn-success subscribedButton",
				"html": "angemeldet"
			},{
				"tag": "button",
				"type": "button",
				"class": "btn btn-danger unsubscribedButton",
				"html": "abgemeldet"
			}]
		}]
	}]
};